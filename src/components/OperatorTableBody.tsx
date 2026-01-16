"use client";

import { Button, Stack, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";

import type { Op } from "../types";
import { readRecord } from "../utils/checkInStorage";
import { formatDateTime } from "../utils/datetime";

type OperatorTableBodyProps = {
  opId: number;
  operators: Op["operators"];
  sortedData: Op["operators"];
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  onCodeChange: (opId: number, operatorId: number, value: string) => void;
  onCheckIn: (opId: number, operatorId: number, code: string) => void;
  onCheckOut: (opId: number, operatorId: number, code: string) => void;
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
        const record = readRecord(opId, operator.id);
        const key = `${opId}:${operator.id}`;

        return (
          <TableRow key={operator.id}>
            <TableCell>{operator.firstName}</TableCell>
            <TableCell>{operator.lastName}</TableCell>
            <TableCell align="right">{operator.opsCompleted}</TableCell>
            <TableCell align="right">
              {Math.round(operator.reliability * 100)}%
            </TableCell>
            <TableCell>{operator.endorsements.join(", ")}</TableCell>
            <TableCell>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  label="Code"
                  variant="outlined"
                  value={codeByKey[key] ?? ""}
                  onChange={(event) =>
                    onCodeChange(opId, operator.id, event.target.value)
                  }
                  error={Boolean(errorByKey[key])}
                  helperText={errorByKey[key] ?? ""}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => onCheckIn(opId, operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Check In
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onCheckOut(opId, operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
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
                  {record.checkIn && <>In: {formatDateTime(record.checkIn.timestamp)}</>}
                  {record.checkOut && (
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
