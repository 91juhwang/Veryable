"use client";

import { Table } from "@mui/material";

import type { Op } from "../types";
import { OperatorTableHeader } from "./OperatorTableHeader";
import { useSort } from "../hooks/useSort";
import { applySort } from "../utils/sorting";
import { OperatorTableBody } from "./OperatorTableBody";

type OperatorTableProps = {
  opId: number;
  operators: Op["operators"];
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  onCodeChange: (opId: number, operatorId: number, value: string) => void;
  onCheckIn: (opId: number, operatorId: number, code: string) => void;
  onCheckOut: (opId: number, operatorId: number, code: string) => void;
};

export function OperatorTable({
  opId,
  operators,
  codeByKey,
  errorByKey,
  onCodeChange,
  onCheckIn,
  onCheckOut,
}: OperatorTableProps) {
  const { sortState, toggleSort, sortDirection } = useSort();
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
        onCodeChange={onCodeChange}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
      />
    </Table>
  );
}
