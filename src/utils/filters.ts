import type { Op } from "../types";

export function search(ops: Op[], query: string): Op[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return ops;

  return ops.reduce<Op[]>((acc, op) => {
    const foundOp =
      op.opTitle.toLowerCase().includes(normalized) ||
      op.publicId.toLowerCase().includes(normalized);

    if (foundOp) {
      acc.push(op);
      return acc;
    }

    const foundOperators = op.operators.filter((operator) =>
      `${operator.firstName} ${operator.lastName}`
        .toLowerCase()
        .includes(normalized)
    );

    if (foundOperators.length > 0) {
      acc.push({ ...op, operators: foundOperators });
    }

    return acc;
  }, []);
}
