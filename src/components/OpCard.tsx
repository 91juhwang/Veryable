"use client";

import { Card, CardContent, Typography } from "@mui/material";

import type { Op } from "../types";
import { formatToTime } from "../utils/datetime";
import { OperatorTable } from "./OperatorTable";

type OpCardProps = {
  op: Op;
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  onCodeChange: (opId: number, operatorId: number, value: string) => void;
  onCheckIn: (opId: number, operatorId: number, code: string) => void;
  onCheckOut: (opId: number, operatorId: number, code: string) => void;
};

export function OpCard({
  op,
  codeByKey,
  errorByKey,
  onCodeChange,
  onCheckIn,
  onCheckOut,
}: OpCardProps) {
  return (
    <Card variant="outlined">
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
          onCodeChange={onCodeChange}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
        />
      </CardContent>
    </Card>
  );
}
