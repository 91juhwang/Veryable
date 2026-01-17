import { act, renderHook } from "@testing-library/react";

import { useSearch } from "../../src/hooks/useSearch";
import type { Op } from "../../src/types";

const ops: Op[] = [
  {
    opId: 1,
    publicId: "A-1",
    opTitle: "Alpha Op",
    opDate: "1970-01-01T00:00:00.000Z",
    filledQuantity: 0,
    operatorsNeeded: 2,
    startTime: "1970-01-01T08:00:00.000Z",
    endTime: "1970-01-01T12:00:00.000Z",
    estTotalHours: 4,
    checkInCode: "1111",
    checkOutCode: "2222",
    checkInExpirationTime: "1970-01-01T09:00:00.000Z",
    checkOutExpirationTime: "1970-01-01T13:00:00.000Z",
    operators: [],
  },
  {
    opId: 2,
    publicId: "B-2",
    opTitle: "Bravo Op",
    opDate: "1970-01-02T00:00:00.000Z",
    filledQuantity: 0,
    operatorsNeeded: 1,
    startTime: "1970-01-02T08:00:00.000Z",
    endTime: "1970-01-02T12:00:00.000Z",
    estTotalHours: 4,
    checkInCode: "3333",
    checkOutCode: "4444",
    checkInExpirationTime: "1970-01-02T09:00:00.000Z",
    checkOutExpirationTime: "1970-01-02T13:00:00.000Z",
    operators: [],
  },
];

describe("useSearch", () => {
  it("filters ops by query", () => {
    const { result } = renderHook(() => useSearch(ops));

    act(() => {
      result.current.setQuery("alpha");
    });

    expect(result.current.filteredOps).toHaveLength(1);
    expect(result.current.filteredOps[0].opId).toBe(1);
  });
});
