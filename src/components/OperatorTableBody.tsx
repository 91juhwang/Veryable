"use client";

import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

import { OperatorRow } from "./OperatorRow";

import type { Op } from "../types";

type OperatorTableBodyProps = {
  opId: number;
  sortedData: Op["operators"];
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  onCodeChange: (operatorId: number, value: string) => void;
  onCheckIn: (operatorId: number, code: string) => void;
  onCheckOut: (operatorId: number, code: string) => void;
};

export function OperatorTableBody({
  opId,
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
      {sortedData.length === 0 && (
        <TableRow>
          <TableCell colSpan={6}>
            <Typography color="text.secondary">
              No operators to display.
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {sortedData.map((operator) => {
        const key = `${opId}:${operator.id}`;

        return (
          <OperatorRow
            key={operator.id}
            opId={opId}
            operator={operator}
            code={codeByKey[key] ?? ""}
            error={errorByKey[key] ?? ""}
            onCodeChange={onCodeChange}
            onCheckIn={onCheckIn}
            onCheckOut={onCheckOut}
          />
        );
      })}
    </TableBody>
  );
}
