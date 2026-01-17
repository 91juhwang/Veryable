import { act, renderHook } from "@testing-library/react";

import { useOperatorCheck } from "../../src/hooks/useOperatorCheck";

describe("useOperatorCheck", () => {
  const opId = 1;
  const checkInCode = "1111";
  const checkOutCode = "2222";

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores check-in record when code is valid", () => {
    const { result } = renderHook(() =>
      useOperatorCheck(opId, checkInCode, checkOutCode)
    );

    act(() => {
      result.current.handleCodeChange(5, "1111");
    });

    act(() => {
      result.current.handleCheckIn(5, "1111");
    });

    const stored = window.localStorage.getItem("1:5");
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored ?? "{}") as {
      checkIn?: { code: string };
    };
    expect(parsed.checkIn?.code).toBe("1111");
  });

  it("sets an error when check-out code is invalid", () => {
    const { result } = renderHook(() =>
      useOperatorCheck(opId, checkInCode, checkOutCode)
    );

    act(() => {
      result.current.handleCheckOut(5, "9999");
    });

    expect(result.current.errorByKey["1:5"]).toBe("Invalid check-out code.");
  });
});
