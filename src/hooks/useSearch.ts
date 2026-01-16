"use client";

import { useMemo, useState } from "react";

import { search } from "../utils/filters";

import type { Op } from "../types";

type OpsSearchState = {
  query: string;
  setQuery: (value: string) => void;
  filteredOps: Op[];
};

export function useSearch(ops: Op[]): OpsSearchState {
  const [query, setQuery] = useState<string>("");

  const filteredOps = useMemo(() => search(ops, query), [ops, query]);

  return { query, setQuery, filteredOps };
}
