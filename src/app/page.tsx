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
import { formatDateTime, formatToTime } from "../utils/datetime";
import type { Op } from "../types";

export default function Home() {
  const { data, error, loading } = useFetch<Op[]>(
    "https://frontend-challenge.veryableops.com/"
  );

  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});
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

  const handleCheckOut = (
    opId: number,
    operatorId: number,
    code: string
  ) => {
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
              <Typography color="text.secondary">
                {formatToTime(op.startTime)} – {formatToTime(op.endTime)}
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
