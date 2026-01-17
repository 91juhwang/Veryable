import { render, screen } from "@testing-library/react";

import { OperatorTableHeader } from "../../src/components/OperatorTableHeader";

describe("OperatorTableHeader", () => {
  it("renders all column headers", () => {
    render(
      <table>
        <OperatorTableHeader
          sortState={null}
          onToggleSort={() => {}}
          sortDirection={() => "asc"}
        />
      </table>
    );

    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Ops Completed")).toBeInTheDocument();
    expect(screen.getByText("Reliability")).toBeInTheDocument();
    expect(screen.getByText("Endorsements")).toBeInTheDocument();
    expect(screen.getByText("Check In / Out")).toBeInTheDocument();
  });
});
