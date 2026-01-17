"use client";

import { Table, TableContainer } from "@mui/material";

import { useOperatorCheck } from "../hooks/useOperatorCheck";
import { useSort } from "../hooks/useSort";

import { OperatorTableHeader } from "./OperatorTableHeader";
import { OperatorTableBody } from "./OperatorTableBody";

import { applySort } from "../utils/sorting";

import type { Op } from "../types";

type OperatorTableProps = {
  op: Op;
};

export function OperatorTable({ op }: OperatorTableProps) {
  const { opId, operators, checkInCode, checkOutCode } = op;
  const { sortState, toggleSort, sortDirection } = useSort();
  const {
    codeByKey,
    errorByKey,
    handleCodeChange,
    handleCheckIn,
    handleCheckOut,
  } = useOperatorCheck(opId, checkInCode, checkOutCode);
  const sortedData = applySort(operators, sortState);

  return (
    <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
      <Table size="small" sx={{ minWidth: 760 }}>
        <OperatorTableHeader
          sortState={sortState}
          onToggleSort={toggleSort}
          sortDirection={sortDirection}
        />
        <OperatorTableBody
          opId={opId}
          operators={operators}
          sortedData={sortedData}
          codeByKey={codeByKey}
          errorByKey={errorByKey}
          onCodeChange={handleCodeChange}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
      </Table>
    </TableContainer>
  );
}
