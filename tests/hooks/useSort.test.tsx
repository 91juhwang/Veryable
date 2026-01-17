import { act, renderHook } from "@testing-library/react";

import { useSort } from "../../src/hooks/useSort";

describe("useSort", () => {
  it("cycles sort state through asc, desc, and none", () => {
    const { result } = renderHook(() => useSort());

    expect(result.current.sortState).toBeNull();

    act(() => {
      result.current.toggleSort("firstName");
    });
    expect(result.current.sortState).toEqual({
      key: "firstName",
      direction: "asc",
    });

    act(() => {
      result.current.toggleSort("firstName");
    });
    expect(result.current.sortState).toEqual({
      key: "firstName",
      direction: "desc",
    });

    act(() => {
      result.current.toggleSort("firstName");
    });
    expect(result.current.sortState).toBeNull();
  });
});
