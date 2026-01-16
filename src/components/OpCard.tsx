"use client";

import { Card, CardContent, Typography } from "@mui/material";

import type { Op } from "../types";
import { formatToTime } from "../utils/datetime";
import { OperatorTable } from "./OperatorTable";

type OpCardProps = {
  op: Op;
};

export function OpCard({
  op,
}: OpCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{op.opTitle}</Typography>
        <Typography color="text.secondary">ID: {op.publicId}</Typography>
        <Typography color="text.secondary">{op.operatorsNeeded} operators needed</Typography>
        <Typography color="text.secondary">
          {formatToTime(op.startTime)} – {formatToTime(op.endTime)}
        </Typography>
        <OperatorTable op={op} />
      </CardContent>
    </Card>
  );
}
