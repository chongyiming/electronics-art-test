import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Code from "@/app/code/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Code", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  it("check when userid is not define", () => {
    render(<Code searchParams={{}} />);
    expect(screen.getByText("Please login first")).toBeInTheDocument();
  });

  it("code field displays correct initial value", () => {
    render(<Code searchParams={{ id: "687b7ee629b8c4729d6cf50f" }} />);
    const input = screen.getByTestId("codeField");
    expect(input).toHaveValue(0);
  });

  it("check for typing and submit the form for code", () => {
    render(<Code searchParams={{ id: "687b7ee629b8c4729d6cf50f" }} />);
    const input = screen.getByTestId("codeField");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(input, { target: { value: "000000" } });
    fireEvent.click(submitButton);
    expect(input).toHaveValue(Number("000000"));
  });
});
