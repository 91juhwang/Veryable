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
  TableSortLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { useFetch } from "../hooks/useFetch";
import { useState, useMemo } from "react";
import {
  readRecord,
  writeRecord,
} from "../utils/checkInStorage";
import { formatDateTime, formatToTime } from "../utils/datetime";
import { search } from "../utils/filters";
import { applySort } from "../utils/sorting";
import type { Op } from "../types";
import type { SortKey } from "../utils/sorting";

export default function Home() {
  const { data, error, loading } = useFetch<Op[]>(
    "https://frontend-challenge.veryableops.com/"
  );

  const [query, setQuery] = useState<string>("");
  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});
  const [operatorSort, setOperatorSort] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>(null);

  // derived data
  const ops = data ?? [];
  const filteredOps = useMemo(
    () => search(ops, query),
    [ops, query]
  );

  function handleCodeChange(opId: number, operatorId: number, value: string) {
    const key = `${opId}:${operatorId}`;
    setCodeByKey((prev) => ({ ...prev, [key]: value }));
  };

  function handleCheckIn(opId: number, operatorId: number, code: string) {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-in code.",
      }));
      return;
    }

    const op = ops.find((item) => item.opId === opId);
    if (!op || op.checkInCode !== code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Invalid check-in code.",
      }));
      return;
    }

    setErrorByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    setCodeByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

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

  function handleCheckOut(opId: number, operatorId: number, code: string) {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-out code.",
      }));
      return;
    }

    const op = ops.find((item) => item.opId === opId);
    if (!op || op.checkOutCode !== code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Invalid check-out code.",
      }));
      return;
    }

    setErrorByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    setCodeByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

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

  function toggleSort(key: SortKey) {
    setOperatorSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" }
      if (prev.direction === "asc") return { key, direction: "desc" }

      return null;
    });
  };

  function sortDirection(key: SortKey) {
    if (operatorSort?.key === key) return operatorSort.direction
    return "asc";
  };

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
              <Typography color="text.secondary">
                ID: {op.publicId}
              </Typography>
              <Typography color="text.secondary">
                {op.operatorsNeeded} operators needed
              </Typography>
              <Typography color="text.secondary">
                {formatToTime(op.startTime)} – {formatToTime(op.endTime)}
              </Typography>
              <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sortDirection={
                        operatorSort?.key === "firstName"
                          ? operatorSort.direction
                          : false
                      }
                    >
                      <TableSortLabel
                        active={operatorSort?.key === "firstName"}
                        direction={sortDirection("firstName")}
                        onClick={() => toggleSort("firstName")}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        First Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        operatorSort?.key === "lastName"
                          ? operatorSort.direction
                          : false
                      }
                    >
                      <TableSortLabel
                        active={operatorSort?.key === "lastName"}
                        direction={sortDirection("lastName")}
                        onClick={() => toggleSort("lastName")}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Last Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      align="right"
                      sortDirection={
                        operatorSort?.key === "opsCompleted"
                          ? operatorSort.direction
                          : false
                      }
                    >
                      <TableSortLabel
                        active={operatorSort?.key === "opsCompleted"}
                        direction={sortDirection("opsCompleted")}
                        onClick={() => toggleSort("opsCompleted")}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Ops Completed
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      align="right"
                      sortDirection={
                        operatorSort?.key === "reliability"
                          ? operatorSort.direction
                          : false
                      }
                    >
                      <TableSortLabel
                        active={operatorSort?.key === "reliability"}
                        direction={sortDirection("reliability")}
                        onClick={() => toggleSort("reliability")}
                      >
                        Reliability
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Endorsements</TableCell>
                    <TableCell>Check In / Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applySort(op.operators, operatorSort).map((operator) => {
                    const record = readRecord(op.opId, operator.id);
                    return (
                      <TableRow key={operator.id}>
                        <TableCell>
                          {operator.firstName}
                        </TableCell>
                        <TableCell>{operator.lastName}</TableCell>
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
                              error={Boolean(
                                errorByKey[`${op.opId}:${operator.id}`]
                              )}
                              helperText={
                                errorByKey[`${op.opId}:${operator.id}`] ?? ""
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
                              sx={{ whiteSpace: 'nowrap' }}
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
                              sx={{ whiteSpace: 'nowrap' }}
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
                                  In: {formatDateTime(record.checkIn.timestamp)}
                                </>
                              )}
                              {record.checkOut && (
                                <>
                                  {` <> `} Out: {formatDateTime(record.checkOut.timestamp)}
                                </>
                              )}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {op.operators.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Typography color="text.secondary">
                          No operators to display.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
