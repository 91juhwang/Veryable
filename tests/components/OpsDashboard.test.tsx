import { render, screen } from "@testing-library/react";

import { OpsDashboard } from "../../src/components/OpsDashboard";

describe("OpsDashboard", () => {
  it("renders empty state when there are no ops", () => {
    render(<OpsDashboard />);

    expect(
      screen.getByText("No ops or operators match your search.")
    ).toBeInTheDocument();
  });
});
