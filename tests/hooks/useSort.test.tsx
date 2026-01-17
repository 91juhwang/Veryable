import { act, renderHook } from "@testing-library/react";

import { useSort } from "../../src/hooks/useSort";

describe("useSort", () => {
  it("cycles sort state through asc, desc, and none", () => {
    const { result } = renderHook(() => useSort());

    expect(result.current.sortState).toBeNull();

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortState).toEqual({
      key: "name",
      direction: "asc",
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortState).toEqual({
      key: "name",
      direction: "desc",
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current.sortState).toBeNull();
  });
});
