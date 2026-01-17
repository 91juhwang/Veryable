import { render, screen } from "@testing-library/react";

import { OperatorTable } from "../../src/components/OperatorTable";
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

describe("OperatorTable", () => {
  it("renders headers and empty state", () => {
    render(<OperatorTable op={op} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("No operators to display.")).toBeInTheDocument();
  });
});
