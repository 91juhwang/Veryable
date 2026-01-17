"use client";

import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

import type { SortKey } from "../utils/sorting";

type OperatorTableHeaderProps = {
  sortState: { key: SortKey; direction: "asc" | "desc" } | null;
  onToggleSort: (key: SortKey) => void;
  sortDirection: (key: SortKey) => "asc" | "desc";
};

export function OperatorTableHeader({
  sortState,
  onToggleSort,
  sortDirection,
}: OperatorTableHeaderProps) {

  function cellDirection(key: SortKey) {
    return sortState?.key === key ? sortDirection(key) : false;
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sortDirection={cellDirection("name")}
        >
          <TableSortLabel
            active={sortState?.key === "name"}
            direction={sortDirection("name")}
            onClick={() => onToggleSort("name")}
            sx={{ whiteSpace: "nowrap" }}
          >
            Name
          </TableSortLabel>
        </TableCell>
        <TableCell
          align="right"
          sortDirection={cellDirection("opsCompleted")}
        >
          <TableSortLabel
            active={sortState?.key === "opsCompleted"}
            direction={sortDirection("opsCompleted")}
            onClick={() => onToggleSort("opsCompleted")}
            sx={{ whiteSpace: "nowrap" }}
          >
            Ops Completed
          </TableSortLabel>
        </TableCell>
        <TableCell
          align="right"
          sortDirection={cellDirection("reliability")}
        >
          <TableSortLabel
            active={sortState?.key === "reliability"}
            direction={sortDirection("reliability")}
            onClick={() => onToggleSort("reliability")}
          >
            Reliability
          </TableSortLabel>
        </TableCell>
        <TableCell>Endorsements</TableCell>
        <TableCell>Check In / Out</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );
}
