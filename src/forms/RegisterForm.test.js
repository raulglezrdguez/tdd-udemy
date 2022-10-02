/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  test("inputs should be initially empty", () => {
    render(<RegisterForm />);

    // get email input element
    const emailInputElement = screen.getByRole("textbox");
    // expect that to be in the document
    expect(emailInputElement).toBeInTheDocument();
    // expect to have value === ''
    expect(emailInputElement).toHaveValue("");

    // get password input element
    const passwordInputElement = screen.getByLabelText("Password");
    expect(passwordInputElement).toHaveValue("");

    // get confirm password element
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInputElement).toHaveValue("");
  });

  test("should be able to type an email", () => {
    render(<RegisterForm />);

    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i, // the label
    });
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, "laura@gmail.com");
    expect(emailInputElement).toHaveValue("laura@gmail.com");
  });

  test("should be able to type a password", () => {
    render(<RegisterForm />);

    const passwordInputElement = screen.getByLabelText(/^password/i);
    userEvent.clear(passwordInputElement);
    userEvent.type(passwordInputElement, "estoesunaprueba");
    expect(passwordInputElement).toHaveValue("estoesunaprueba");
  });

  test("should be able to type a confirm password", () => {
    render(<RegisterForm />);
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    userEvent.clear(confirmPasswordInputElement);
    userEvent.type(confirmPasswordInputElement, "probando");
    expect(confirmPasswordInputElement).toHaveValue("probando");
  });

  test("should show error message on invalid email", () => {
    render(<RegisterForm />);

    // no email error at the beginning
    let emailErrorElement = screen.queryByText(
      /the email you input is invalid/i
    );
    expect(emailErrorElement).not.toBeInTheDocument();

    // type wrong email
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, "wrongemail.com");

    // click submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // email error should appear
    emailErrorElement = screen.getByText(/the email you input is invalid/i);
    expect(emailErrorElement).toBeInTheDocument();
  });

  test("should show error message on incorrect password", () => {
    render(<RegisterForm />);

    // enter valid email
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, "laura@gmail.com");

    // enter invalid password
    const passwordInputElement = screen.getByLabelText(/^password/i);
    userEvent.clear(passwordInputElement);
    userEvent.type(passwordInputElement, "1234");

    // should not find error message
    let passwordErrorElement = screen.queryByText(
      /the password must have at less 5 charaters length/i
    );
    expect(passwordErrorElement).not.toBeInTheDocument();

    // click button
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);

    // show error
    passwordErrorElement = screen.getByText(
      /the password must have at less 5 charaters length/i
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test("should show error message when passwords don't match", () => {
    render(<RegisterForm />);

    // enter valid email
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, "kevin@gmail.com");

    // enter valid password
    const passwordInputElement = screen.getByLabelText(/^password/i);
    userEvent.clear(passwordInputElement);
    userEvent.type(passwordInputElement, "1234565");

    // enter invalid confirm password
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    userEvent.clear(confirmPasswordInputElement);
    userEvent.type(confirmPasswordInputElement, "123");

    // should not find error message
    let confirmPasswordErrorElement = screen.queryByText(
      /the passwords don't match/i
    );
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();

    // click submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // show error
    confirmPasswordErrorElement = screen.getByText(
      /the passwords don't match/i
    );
    expect(confirmPasswordErrorElement).toBeInTheDocument();
  });

  test("should don't show error message when valid input", () => {
    render(<RegisterForm />);

    // enter valid email
    const emailInputElement = screen.getByRole("textbox", {
      name: /email address/i,
    });
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, "laura@gmail.com");

    // enter valid password
    const passwordInputElement = screen.getByLabelText(/^password/i);
    userEvent.clear(passwordInputElement);
    userEvent.type(passwordInputElement, "123456");

    // enter invalid confirm password
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    userEvent.clear(confirmPasswordInputElement);
    userEvent.type(confirmPasswordInputElement, "123456");

    // should not find error message
    let errorElement = screen.queryByText(/the email you input is invalid/i);
    expect(errorElement).not.toBeInTheDocument();
    errorElement = screen.queryByText(
      /the password must have at less 5 charaters length/i
    );
    expect(errorElement).not.toBeInTheDocument();
    errorElement = screen.queryByText(/the passwords don't match/i);
    expect(errorElement).not.toBeInTheDocument();

    // click submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    // don't show error
    errorElement = screen.queryByText(/the email you input is invalid/i);
    expect(errorElement).not.toBeInTheDocument();
    errorElement = screen.queryByText(
      /the password must have at less 5 charaters length/i
    );
    expect(errorElement).not.toBeInTheDocument();
    errorElement = screen.queryByText(/the passwords don't match/i);
    expect(errorElement).not.toBeInTheDocument();
  });
});
