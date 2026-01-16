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
          sortDirection={cellDirection("firstName")}
        >
          <TableSortLabel
            active={sortState?.key === "firstName"}
            direction={sortDirection("firstName")}
            onClick={() => onToggleSort("firstName")}
            sx={{ whiteSpace: "nowrap" }}
          >
            First Name
          </TableSortLabel>
        </TableCell>
        <TableCell
          sortDirection={cellDirection("lastName")}
        >
          <TableSortLabel
            active={sortState?.key === "lastName"}
            direction={sortDirection("lastName")}
            onClick={() => onToggleSort("lastName")}
            sx={{ whiteSpace: "nowrap" }}
          >
            Last Name
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
      </TableRow>
    </TableHead>
  );
}
