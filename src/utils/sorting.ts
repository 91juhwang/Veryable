import type { Op } from "../types";

export type SortKey = "firstName" | "lastName" | "opsCompleted" | "reliability";
type Sort = { key: SortKey; direction: "asc" | "desc" } | null;

export function sort(
  operators: Op["operators"],
  sort: Sort
): Op["operators"] {
  if (!sort) return operators;

  const sorted = [...operators].sort((a, b) => {
    if (sort.key === "firstName") {
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    }

    if (sort.key === "lastName") {
      return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
    }

    if (sort.key === "opsCompleted") {
      return a.opsCompleted - b.opsCompleted;
    }

    return a.reliability - b.reliability;
  });

  return sort.direction === "asc" ? sorted : sorted.reverse();
}
