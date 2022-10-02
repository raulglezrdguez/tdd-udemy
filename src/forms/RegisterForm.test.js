/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterForm from "./RegisterForm";

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email address/i,
  });
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.clear(emailInputElement);
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.clear(passwordInputElement);
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.clear(confirmPasswordInputElement);
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickSubmitButton = () => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);
  return submitButton;
};

describe("RegisterForm", () => {
  // this will run only once before all tests
  // beforeAll(() => {})

  // this will run before each test
  beforeEach(() => {
    render(<RegisterForm />);
  });

  // this will run after each test
  // afterEach(() => {})

  // this will run once after all tests
  // afterAll(() => {})

  test("inputs should be initially empty", () => {
    // render(<RegisterForm />);

    // get email input element
    const emailInputElement = screen.getByRole("textbox");
    // expect that to be in the document
    expect(emailInputElement).toBeInTheDocument();
    // expect to have value === ''
    expect(emailInputElement).toHaveValue("");

    // get password input element
    // const passwordInputElement = screen.getByLabelText("Password");
    // expect(passwordInputElement).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveValue("");

    // get confirm password element
    // const confirmPasswordInputElement =
    //   screen.getByLabelText(/confirm password/i);
    // expect(confirmPasswordInputElement).toHaveValue("");
    expect(screen.getByLabelText(/confirm password/i)).toHaveValue("");
  });

  describe("type into form", () => {
    // it will run before each test inside this describe block
    // beforeEach(() => {})

    test("should be able to type an email", () => {
      // render(<RegisterForm />);

      // const emailInputElement = screen.getByRole("textbox", {
      //   name: /email address/i, // the label
      // });
      // userEvent.clear(emailInputElement);
      // userEvent.type(emailInputElement, "laura@gmail.com");
      const { emailInputElement } = typeIntoForm({ email: "laura@gmail.com" });
      expect(emailInputElement).toHaveValue("laura@gmail.com");
    });

    test("should be able to type a password", () => {
      // render(<RegisterForm />);

      // const passwordInputElement = screen.getByLabelText(/^password/i);
      // userEvent.clear(passwordInputElement);
      // userEvent.type(passwordInputElement, "estoesunaprueba");
      const { passwordInputElement } = typeIntoForm({
        password: "estoesunaprueba",
      });
      expect(passwordInputElement).toHaveValue("estoesunaprueba");
    });

    test("should be able to type a confirm password", () => {
      // render(<RegisterForm />);
      // const confirmPasswordInputElement =
      //   screen.getByLabelText(/confirm password/i);
      // userEvent.clear(confirmPasswordInputElement);
      // userEvent.type(confirmPasswordInputElement, "probando");
      const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: "probando",
      });
      expect(confirmPasswordInputElement).toHaveValue("probando");
    });
  });

  describe("show error messages", () => {
    test("should show error message on invalid email", () => {
      // render(<RegisterForm />);

      // no email error at the beginning
      // let emailErrorElement = screen.queryByText(
      //   /the email you input is invalid/i
      // );
      // expect(emailErrorElement).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();

      // type wrong email
      // const emailInputElement = screen.getByRole("textbox", {
      //   name: /email address/i,
      // });
      // userEvent.clear(emailInputElement);
      // userEvent.type(emailInputElement, "wrongemail.com");
      typeIntoForm({ email: "wrongemail.com" });

      // click submit button
      // const submitButton = screen.getByRole("button", { name: /submit/i });
      // userEvent.click(submitButton);
      clickSubmitButton();

      // email error should appear
      // emailErrorElement = screen.getByText(/the email you input is invalid/i);
      // expect(emailErrorElement).toBeInTheDocument();
      expect(
        screen.getByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show error message on incorrect password", () => {
      // render(<RegisterForm />);

      // enter valid email
      // const emailInputElement = screen.getByRole("textbox", {
      //   name: /email address/i,
      // });
      // userEvent.clear(emailInputElement);
      // userEvent.type(emailInputElement, "laura@gmail.com");

      // enter invalid password
      // const passwordInputElement = screen.getByLabelText(/^password/i);
      // userEvent.clear(passwordInputElement);
      // userEvent.type(passwordInputElement, "1234");

      typeIntoForm({ email: "laura@gmail.com", password: "1234" });

      // should not find error message
      // let passwordErrorElement = screen.queryByText(
      //   /the password must have at less 5 charaters length/i
      // );
      // expect(passwordErrorElement).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the password must have at less 5 charaters length/i)
      ).not.toBeInTheDocument();

      // click button
      // const submitButton = screen.getByRole("button", {
      //   name: /submit/i,
      // });
      // userEvent.click(submitButton);
      clickSubmitButton();

      // show error
      // passwordErrorElement = screen.getByText(
      //   /the password must have at less 5 charaters length/i
      // );
      // expect(passwordErrorElement).toBeInTheDocument();
      expect(
        screen.getByText(/the password must have at less 5 charaters length/i)
      ).toBeInTheDocument();
    });

    test("should show error message when passwords don't match", () => {
      // render(<RegisterForm />);

      // enter valid email
      // const emailInputElement = screen.getByRole("textbox", {
      //   name: /email address/i,
      // });
      // userEvent.clear(emailInputElement);
      // userEvent.type(emailInputElement, "kevin@gmail.com");

      // enter valid password
      // const passwordInputElement = screen.getByLabelText(/^password/i);
      // userEvent.clear(passwordInputElement);
      // userEvent.type(passwordInputElement, "123456");

      // enter invalid confirm password
      // const confirmPasswordInputElement =
      //   screen.getByLabelText(/confirm password/i);
      // userEvent.clear(confirmPasswordInputElement);
      // userEvent.type(confirmPasswordInputElement, "123");

      typeIntoForm({
        email: "kevin@gmail.com",
        password: "123456",
        confirmPassword: "123",
      });

      // should not find error message
      // let confirmPasswordErrorElement = screen.queryByText(
      //   /the passwords don't match/i
      // );
      // expect(confirmPasswordErrorElement).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the passwords don't match/i)
      ).not.toBeInTheDocument();

      // click submit button
      // const submitButton = screen.getByRole("button", { name: /submit/i });
      // userEvent.click(submitButton);
      clickSubmitButton();

      // show error
      // confirmPasswordErrorElement = screen.getByText(
      //   /the passwords don't match/i
      // );
      // expect(confirmPasswordErrorElement).toBeInTheDocument();
      expect(
        screen.getByText(/the passwords don't match/i)
      ).toBeInTheDocument();
    });

    test("should don't show error message when valid input", () => {
      // render(<RegisterForm />);

      // enter valid email
      // const emailInputElement = screen.getByRole("textbox", {
      //   name: /email address/i,
      // });
      // userEvent.clear(emailInputElement);
      // userEvent.type(emailInputElement, "laura@gmail.com");

      // enter valid password
      // const passwordInputElement = screen.getByLabelText(/^password/i);
      // userEvent.clear(passwordInputElement);
      // userEvent.type(passwordInputElement, "123456");

      // enter invalid confirm password
      // const confirmPasswordInputElement =
      //   screen.getByLabelText(/confirm password/i);
      // userEvent.clear(confirmPasswordInputElement);
      // userEvent.type(confirmPasswordInputElement, "123456");

      typeIntoForm({
        email: "laura@gmail.com",
        password: "123456",
        confirmPassword: "123456",
      });

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
      // const submitButton = screen.getByRole("button", { name: /submit/i });
      // userEvent.click(submitButton);
      clickSubmitButton();

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
});
