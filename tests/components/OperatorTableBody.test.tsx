import { render, screen } from "@testing-library/react";

import { OperatorTableBody } from "../../src/components/OperatorTableBody";
import type { Op } from "../../src/types";

const operator: Op["operators"][number] = {
  id: 1,
  firstName: "Taylor",
  lastName: "Ng",
  opsCompleted: 10,
  reliability: 0.9,
  endorsements: ["Fast", "Reliable"],
};

describe("OperatorTableBody", () => {
  it("renders empty state when there are no operators", () => {
    render(
      <table>
        <OperatorTableBody
          opId={1}
          sortedData={[]}
          codeByKey={{}}
          errorByKey={{}}
          onCodeChange={() => {}}
          onCheckIn={() => {}}
          onCheckOut={() => {}}
        />
      </table>
    );

    expect(screen.getByText("No operators to display.")).toBeInTheDocument();
  });

  it("renders operator rows", () => {
    render(
      <table>
        <OperatorTableBody
          opId={1}
          sortedData={[operator]}
          codeByKey={{}}
          errorByKey={{}}
          onCodeChange={() => {}}
          onCheckIn={() => {}}
          onCheckOut={() => {}}
        />
      </table>
    );

    expect(screen.getByText("Taylor Ng")).toBeInTheDocument();
  });
});
