import { fireEvent, render, screen } from "@testing-library/react";

import { SearchBar } from "../../src/components/SearchBar";

describe("SearchBar", () => {
  it("renders the input with the provided value", () => {
    render(<SearchBar value="alpha" onChange={() => {}} />);

    const input = screen.getByLabelText(/search ops or operators/i);
    expect(input).toHaveValue("alpha");
  });

  it("calls onChange when the input changes", () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByLabelText(/search ops or operators/i);
    fireEvent.change(input, { target: { value: "beta" } });

    expect(onChange).toHaveBeenCalledWith("beta");
  });
});
