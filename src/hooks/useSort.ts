"use client";

import { useState } from "react";

import type { SortKey } from "../utils/sorting";

type SortState = {
  key: SortKey;
  direction: "asc" | "desc";
} | null;

type OperatorSortHook = {
  sortState: SortState;
  toggleSort: (key: SortKey) => void;
  sortDirection: (key: SortKey) => "asc" | "desc";
};

export function useSort(): OperatorSortHook {
  const [sortState, setSortState] = useState<SortState>(null);

  const toggleSort = (key: SortKey) => {
    setSortState((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const sortDirection = (key: SortKey) => {
    if (sortState?.key === key) return sortState.direction;
    return "asc";
  };

  return { sortState, toggleSort, sortDirection };
}
