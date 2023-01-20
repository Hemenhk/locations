import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignInForm from "../auth/SignInForm";

test("renders SignInForm", () => {
    render(
      <BrowserRouter>
          <SignInForm />
      </BrowserRouter>
    );
});

test("render username input field", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const usernameInput = screen.getByPlaceholderText(/Enter Username:/i)
    expect(usernameInput).toBeInTheDocument();
})

test("render password input field", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
        
      );

    const passwordInput = screen.getByPlaceholderText(/Enter Password:/i)
    expect(passwordInput).toBeInTheDocument();
})

test("render login button", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const loginButton = screen.getByRole("button")
    expect(loginButton).toBeInTheDocument();
})

test("username input field should be empty", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const emptyUserField = screen.getByPlaceholderText(/Enter Username:/i)
    expect(emptyUserField.value).toBe("");
})

test("password input field should be empty", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const emptyPasswordField = screen.getByPlaceholderText(/Enter Password:/i)
    expect(emptyPasswordField.value).toBe("");
    
})

test("username field should be able to change", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const usernameField = screen.getByPlaceholderText(/Enter Username:/i);
    const testValue = "test";

    fireEvent.change(usernameField, {target:{value:testValue}})
    expect(usernameField.value).toBe(testValue)
})

test("password field should be able to change", () => {
    render(
        <BrowserRouter>
            <SignInForm />
        </BrowserRouter>
      );

    const passwordField = screen.getByPlaceholderText(/Enter Password:/i);
    const testValue = "test";

    fireEvent.change(passwordField, {target:{value:testValue}})
    expect(passwordField.value).toBe(testValue)
})