import type { Op } from "../types";

export type SortKey = "name" | "opsCompleted" | "reliability";
type Sort = { key: SortKey; direction: "asc" | "desc" } | null;

export function sort(operators: Op["operators"], sort: Sort): Op["operators"] {
  if (!sort) return operators;

  const sorted = [...operators].sort((a, b) => {
    if (sort.key === "name") {
      const lastCompare = a.lastName
        .toLowerCase()
        .localeCompare(b.lastName.toLowerCase());
      if (lastCompare !== 0) return lastCompare;
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    }

    if (sort.key === "opsCompleted") {
      return a.opsCompleted - b.opsCompleted;
    }

    return a.reliability - b.reliability;
  });

  return sort.direction === "asc" ? sorted : sorted.reverse();
}
