import { render, screen } from "@testing-library/react";

import { OpCard } from "../../src/components/OpCard";
import type { Op } from "../../src/types";

const op: Op = {
  opId: 1,
  publicId: "A-1",
  opTitle: "Test Op",
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
};

describe("OpCard", () => {
  it("renders op metadata", () => {
    render(<OpCard op={op} />);

    expect(screen.getByText("Test Op")).toBeInTheDocument();
    expect(screen.getByText("ID: A-1")).toBeInTheDocument();
    expect(screen.getByText("2 operators needed")).toBeInTheDocument();
  });
});
