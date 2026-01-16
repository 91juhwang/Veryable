"use client";

import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useFetch } from "../hooks/useFetch";
import { useOperatorCheck } from "../hooks/useOperatorCheck";
import { formatToTime } from "../utils/datetime";
import { search } from "../utils/filters";
import { OperatorTable } from "./OperatorTable";

import type { Op } from "../types";

export function OpsDashboard() {
  const { data, error, loading } = useFetch<Op[]>(
    "https://frontend-challenge.veryableops.com/"
  );
  const {
    codeByKey,
    errorByKey,
    handleCodeChange,
    handleCheckIn,
    handleCheckOut,
  } = useOperatorCheck();

  const [query, setQuery] = useState<string>("");

  const ops = data ?? [];
  const filteredOps = useMemo(() => search(ops, query), [ops, query]);

  return (
    <Stack spacing={5} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1">
        Ops
      </Typography>
      <TextField
        label="Search ops or operators"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading && <Typography>Loading ops…</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && filteredOps.length === 0 && (
        <Typography color="text.secondary">
          No ops or operators match your search.
        </Typography>
      )}
      <Stack spacing={2}>
        {filteredOps.map((op) => (
          <Card key={op.opId} variant="outlined">
            <CardContent>
              <Typography variant="h6">{op.opTitle}</Typography>
              <Typography color="text.secondary">ID: {op.publicId}</Typography>
              <Typography color="text.secondary">
                {op.operatorsNeeded} operators needed
              </Typography>
              <Typography color="text.secondary">
                {formatToTime(op.startTime)} – {formatToTime(op.endTime)}
              </Typography>
              <OperatorTable
                opId={op.opId}
                operators={op.operators}
                codeByKey={codeByKey}
                errorByKey={errorByKey}
                onCodeChange={handleCodeChange}
                onCheckIn={(opId, operatorId, code) =>
                  handleCheckIn(ops, opId, operatorId, code)
                }
                onCheckOut={(opId, operatorId, code) =>
                  handleCheckOut(ops, opId, operatorId, code)
                }
              />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
