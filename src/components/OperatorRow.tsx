"use client";

import { Button, Chip, Stack, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { memo, useCallback } from "react";
import type { ChangeEvent } from "react";

import { readRecord } from "../utils/checkInStorage";
import { formatToTime } from "../utils/datetime";

import type { Op } from "../types";

type OperatorRowProps = {
  opId: number;
  operator: Op["operators"][number];
  code: string;
  error: string;
  onCodeChange: (operatorId: number, value: string) => void;
  onCheckIn: (operatorId: number, code: string) => void;
  onCheckOut: (operatorId: number, code: string) => void;
};

export const OperatorRow = memo(function OperatorRow({
  opId,
  operator,
  code,
  error,
  onCodeChange,
  onCheckIn,
  onCheckOut,
}: OperatorRowProps) {
  const record = readRecord(opId, operator.id);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onCodeChange(operator.id, event.target.value);
  }, [onCodeChange, operator.id]
  );

  const handleCheckIn = useCallback(() => onCheckIn(operator.id, code), [onCheckIn, operator.id, code]);
  const handleCheckOut = useCallback(() => onCheckOut(operator.id, code), [onCheckOut, operator.id, code]);

  return (
    <TableRow
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
            value={code}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error}
          />
          <Button
            size="small"
            variant="outlined"
            onClick={handleCheckIn}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Typography variant="body2" fontSize={14}>Check In</Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleCheckOut}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Typography variant="body2" fontSize={14}>Check Out</Typography>
          </Button>
        </Stack>
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Stack spacing={0.25}>
          {record.checkIn ? (
            <Typography variant="body2">
              Checked in - {formatToTime(record.checkIn.timestamp)}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Not checked in
            </Typography>
          )}
          {record.checkOut && (
            <Typography variant="body2">
              Checked out - {formatToTime(record.checkOut.timestamp)}
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
});
