"use client";

import { Button, Chip, Stack, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

import { readRecord } from "../utils/checkInStorage";
import { formatDateTime } from "../utils/datetime";

import type { Op } from "../types";

type OperatorTableBodyProps = {
  opId: number;
  operators: Op["operators"];
  sortedData: Op["operators"];
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  onCodeChange: (operatorId: number, value: string) => void;
  onCheckIn: (operatorId: number, code: string) => void;
  onCheckOut: (operatorId: number, code: string) => void;
};

export function OperatorTableBody({
  opId,
  operators,
  sortedData,
  codeByKey,
  errorByKey,
  onCodeChange,
  onCheckIn,
  onCheckOut,
}: OperatorTableBodyProps) {

  return (
    <TableBody>
      {operators.length === 0 && (
        <TableRow>
          <TableCell colSpan={6}>
            <Typography color="text.secondary">
              No operators to display.
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {sortedData.map((operator) => {
        const record = readRecord(opId, operator.id) ?? null;
        const key = `${opId}:${operator.id}`;

        return (
          <TableRow key={operator.id}>
            <TableCell>{operator.firstName}</TableCell>
            <TableCell sx={{ whitespace: 'nowrap' }}>{operator.lastName}</TableCell>
            <TableCell align="right">{operator.opsCompleted}</TableCell>
            <TableCell align="right">
              {Math.round(operator.reliability * 100)}%
            </TableCell>
            <TableCell>
              <Stack direction="row" spacing={0.5} sx={{ flexWrap: "nowrap" }}>
                {operator.endorsements.map((endorsement) => (
                  <Chip
                    key={`${operator.id}-${endorsement}`}
                    label={endorsement}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </TableCell>
            <TableCell>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  label="Code"
                  variant="outlined"
                  value={codeByKey[key] ?? ""}
                  onChange={(event) =>
                    onCodeChange(operator.id, event.target.value)
                  }
                  error={Boolean(errorByKey[key])}
                  helperText={errorByKey[key] ?? ""}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => onCheckIn(operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Check In
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onCheckOut(operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Check Out
                </Button>
              </Stack>
              {(record?.checkIn || record?.checkOut) && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mt: 0.5 }}
                >
                  {record?.checkIn && <>In: {formatDateTime(record.checkIn.timestamp)}</>}
                  {record?.checkOut && (
                    <>
                      {" <> "} Out: {formatDateTime(record.checkOut.timestamp)}
                    </>
                  )}
                </Typography>
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
