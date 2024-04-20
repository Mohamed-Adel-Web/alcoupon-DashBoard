import { screen } from "@testing-library/react";
import { render } from "../app/utility/test-utils";
import userEvent from "@testing-library/user-event";
import Login from "../app/login/login";

describe("login form test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render", () => {
    render(<Login />);
    const email = screen.getByRole("textbox", { name: "Email" });
    expect(email).toBeInTheDocument();
    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    const signInButton = screen.getByRole("button");
    expect(signInButton).toBeInTheDocument();
  });

  test("password email type", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const email = screen.getByRole("textbox", { name: "Email" });
    await user.type(email, "ahmed@gmail.com");
    expect(email).toHaveValue("ahmed@gmail.com");
    const password = screen.getByLabelText("Password");
    await user.type(password, "12345678");
    expect(password).toHaveValue("12345678");
  });

  test("signIn Button", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const SignInButton = screen.getByRole("button", { name: /sign in/i });
    const logSpy = jest.spyOn(console, "log");
    await user.click(SignInButton);
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
