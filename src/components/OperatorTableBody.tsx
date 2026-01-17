"use client";

import { Button, Chip, Stack, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { readRecord } from "../utils/checkInStorage";
import { formatToTime } from "../utils/datetime";

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
    <TableBody
      sx={{
        "& .MuiTableRow-root:last-of-type > td": {
          borderBottom: 0,
        },
        "& .MuiTableRow-root:last-of-type > th": {
          borderBottom: 0,
        },
      }}
    >
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
          <TableRow
            key={operator.id}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.03),
              },
            })}
          >
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              {operator.firstName} {operator.lastName}
            </TableCell>
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
                  label="code"
                  variant="outlined"
                  sx={{
                    width: 110,
                    "& .MuiOutlinedInput-input": {
                      paddingTop: "3px",
                      paddingBottom: "3px",
                    },
                    "& .MuiInputLabel-root": {
                      transform: "translate(14px, 3px) scale(1)",
                    },
                    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                      transform: "translate(14px, -7px) scale(0.75)",
                    },
                  }}
                  value={codeByKey[key] ?? ""}
                  onChange={(event) =>
                    onCodeChange(operator.id, event.target.value)
                  }
                  error={Boolean(errorByKey[key])}
                  helperText={errorByKey[key] ?? ""}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onCheckIn(operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <Typography variant="body2" fontSize={14}>Check In</Typography>
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onCheckOut(operator.id, codeByKey[key] ?? "")}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <Typography variant="body2" fontSize={14}>Check Out</Typography>
                </Button>
              </Stack>
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              <Stack spacing={0.25}>
                {record?.checkIn ? (
                  <Typography variant="body2">
                    Checked in - {formatToTime(record.checkIn.timestamp)}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Not checked in
                  </Typography>
                )}
                {record?.checkOut && (
                  <Typography variant="body2">
                    Checked out - {formatToTime(record.checkOut.timestamp)}
                  </Typography>
                )}
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
