"use client";

import {
  Stack,
  Typography,
} from "@mui/material";

import { useFetch } from "../hooks/useFetch";
import { useSearch } from "../hooks/useSearch";

import { SearchBar } from "./SearchBar";
import { OpCard } from "./OpCard";

import type { Op } from "../types";

export function OpsDashboard() {
  const { data, error, loading } = useFetch<Op[]>("https://frontend-challenge.veryableops.com/");

  const ops = data ?? [];
  const { query, setQuery, filteredOps } = useSearch(ops);

  return (
    <Stack spacing={5} sx={{ p: 4 }}>
      <Typography variant="h3" component="h1">All Ops</Typography>

      <SearchBar value={query} onChange={setQuery} />

      {loading && <Typography>Loading ops…</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && filteredOps.length === 0 && (
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
