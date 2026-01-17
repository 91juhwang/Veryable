"use client";

import {
  Stack,
  Typography,
} from "@mui/material";

import { useSearch } from "../hooks/useSearch";

import { SearchBar } from "./SearchBar";
import { OpCard } from "./OpCard";

import type { Op } from "../types";

type OpsDashboardProps = {
  ops?: Op[];
  error?: string | null;
};

export function OpsDashboard({ ops = [], error = null }: OpsDashboardProps) {
  const { query, setQuery, filteredOps } = useSearch(ops);

  return (
    <Stack spacing={5} sx={{ p: 4 }}>
      <Typography variant="h3" component="h1">All Ops</Typography>

      <SearchBar value={query} onChange={setQuery} />

      {error && <Typography color="error">{error}</Typography>}
      {!error && filteredOps.length === 0 && (
        <Typography color="text.secondary">
          No ops or operators match your search.
        </Typography>
      )}

      <Stack spacing={2}>
        {filteredOps.map((op) => (
          <OpCard key={op.opId} op={op} />
        ))}
      </Stack>
    </Stack>
  );
}
