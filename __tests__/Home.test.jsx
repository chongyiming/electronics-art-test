import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  it("email displays correct initial value", () => {
    render(<Home />);
    const input = screen.getByTestId("email");
    expect(input).toHaveValue("");
  });

  it("password displays correct initial value", () => {
    render(<Home />);
    const input = screen.getByTestId("password");
    expect(input).toHaveValue("");
  });

  it("check for typing and submit the form for signup", () => {
    render(<Home />);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(signUpButton);
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("check for typing and submit the form for login", () => {
    render(<Home />);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(loginButton);
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
  });
});
