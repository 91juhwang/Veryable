"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import { useFetch } from "../hooks/useFetch";
import type { Op } from "../types";

export default function Home() {
  const { data, error, loading } = useFetch<Op[]>(
    "https://frontend-challenge.veryableops.com/"
  );

  const ops = data ?? [];

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
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
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
