import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../auth/SignUpForm";

test("renders SignInForm", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );
});

test("render username input field", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const usernameInput = screen.getByPlaceholderText(/Enter Username:/i);
  expect(usernameInput).toBeInTheDocument();
});

test("render password input field", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText(/Enter Password:/i);
  expect(passwordInput).toBeInTheDocument();
});

test("render second password input field", () => {
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText(/Confirm Password:/i);
    expect(passwordInput).toBeInTheDocument();
  });

test("render sign up button", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const signUpButton = screen.getByRole("button");
  expect(signUpButton).toBeInTheDocument();
});

test("username input field should be empty", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const emptyUserField = screen.getByPlaceholderText(/Enter Username:/i);
  expect(emptyUserField.value).toBe("");
});

test("password input field should be empty", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const emptyPasswordField = screen.getByPlaceholderText(/Enter Password:/i);
  expect(emptyPasswordField.value).toBe("");
});

test("second password input field should be empty", () => {
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  
    const emptyPasswordField = screen.getByPlaceholderText(/Confirm Password:/i);
    expect(emptyPasswordField.value).toBe("");
  });

test("username field should be able to change", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const usernameField = screen.getByPlaceholderText(/Enter Username:/i);
  const testValue = "test";

  fireEvent.change(usernameField, { target: { value: testValue } });
  expect(usernameField.value).toBe(testValue);
});

test("password field should be able to change", () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const passwordField = screen.getByPlaceholderText(/Enter Password:/i);
  const testValue = "test";

  fireEvent.change(passwordField, { target: { value: testValue } });
  expect(passwordField.value).toBe(testValue);
});

test("second password field should be able to change", () => {
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  
    const passwordField = screen.getByPlaceholderText(/Confirm Password:/i);
    const testValue = "test";
  
    fireEvent.change(passwordField, { target: { value: testValue } });
    expect(passwordField.value).toBe(testValue);
  });
  