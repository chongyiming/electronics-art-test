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

  it("code field displays correct initial value", () => {
    render(<Code />);
    const input = screen.getByTestId("codeField");
    expect(input).toHaveValue(0);
  });

  it("check for typing and submit the form for code", () => {
    render(<Code />);
    const input = screen.getByTestId("codeField");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(input, { target: { value: "111111" } });
    fireEvent.click(submitButton);
    expect(input).toHaveValue(111111);
  });
});
