"use client";

import {
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import {
  readRecord,
  writeRecord,
} from "../utils/checkInStorage";
import type { Op } from "../types";

export default function Home() {
  const { data, error, loading } = useFetch<Op[]>(
    "https://frontend-challenge.veryableops.com/"
  );

  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({});
  const ops = data ?? [];

  const handleCodeChange = (
    opId: number,
    operatorId: number,
    value: string
  ) => {
    const key = `${opId}:${operatorId}`;
    setCodeByKey((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckIn = (
    opId: number,
    operatorId: number,
    code: string
  ) => {
    if (!code) {
      return;
    }

    writeRecord(
      opId,
      operatorId,
      "checkIn",
      {
        code,
        timestamp: new Date().toISOString(),
      }
    );
  };

  const handleCheckOut = (
    opId: number,
    operatorId: number,
    code: string
  ) => {
    if (!code) {
      return;
    }

    writeRecord(
      opId,
      operatorId,
      "checkOut",
      {
        code,
        timestamp: new Date().toISOString(),
      }
    );
  };

  return (
    <Stack spacing={5} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1">
        Ops
      </Typography>
      {loading && <Typography>Loading ops…</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Stack spacing={2}>
        {ops.map((op) => (
          <Card key={op.opId} variant="outlined">
            <CardContent>
              <Typography variant="h6">{op.opTitle}</Typography>
              <Typography color="text.secondary">
                ID: {op.publicId}
              </Typography>
              <Typography color="text.secondary">
                {op.operatorsNeeded} operators needed
              </Typography>
              <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Operator</TableCell>
                    <TableCell align="right">Ops Completed</TableCell>
                    <TableCell align="right">Reliability</TableCell>
                    <TableCell>Endorsements</TableCell>
                    <TableCell>Check In / Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {op.operators.map((operator) => {
                    const record = readRecord(op.opId, operator.id);
                    return (
                      <TableRow key={operator.id}>
                        <TableCell>
                          {operator.firstName} {operator.lastName}
                        </TableCell>
                        <TableCell align="right">
                          {operator.opsCompleted}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(operator.reliability * 100)}%
                        </TableCell>
                        <TableCell >
                          {operator.endorsements.join(", ")}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                              size="small"
                              label="Code"
                              variant="outlined"
                              value={
                                codeByKey[`${op.opId}:${operator.id}`] ?? ""
                              }
                              onChange={(event) =>
                                handleCodeChange(
                                  op.opId,
                                  operator.id,
                                  event.target.value
                                )
                              }
                            />
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() =>
                                handleCheckIn(
                                  op.opId,
                                  operator.id,
                                  codeByKey[`${op.opId}:${operator.id}`] ?? ""
                                )
                              }
                            >
                              Check In
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                handleCheckOut(
                                  op.opId,
                                  operator.id,
                                  codeByKey[`${op.opId}:${operator.id}`] ?? ""
                                )
                              }
                            >
                              Check Out
                            </Button>
                          </Stack>
                          {(record.checkIn || record.checkOut) && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ mt: 0.5 }}
                            >
                              {record.checkIn && (
                                <>
                                  In: {record.checkIn.code} •{" "}
                                  {new Date(
                                    record.checkIn.timestamp
                                  ).toLocaleString()}
                                </>
                              )}
                              {record.checkIn && record.checkOut && " • "}
                              {record.checkOut && (
                                <>
                                  Out: {record.checkOut.code} •{" "}
                                  {new Date(
                                    record.checkOut.timestamp
                                  ).toLocaleString()}
                                </>
                              )}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
