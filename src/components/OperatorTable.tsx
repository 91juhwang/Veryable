"use client";

import { Table } from "@mui/material";

import type { Op } from "../types";
import { OperatorTableHeader } from "./OperatorTableHeader";
import { useSort } from "../hooks/useSort";
import { applySort } from "../utils/sorting";
import { OperatorTableBody } from "./OperatorTableBody";
import { useOperatorCheck } from "../hooks/useOperatorCheck";

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
    <Table size="small" sx={{ mt: 2 }}>
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
  );
}
