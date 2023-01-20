import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  //   screen.debug()
  const signInLink = screen.getByRole("link", { name: "Sign In" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  render(
    <BrowserRouter>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </BrowserRouter>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign In and Sign Up buttons again on log out", async () => {
  render(
    <BrowserRouter>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </BrowserRouter>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign Out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign In" });
  const signUpLink = await screen.findByRole("link", { name: "Sign Up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

test("renders Add Post on log in", async () => {
  render(
    <BrowserRouter>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </BrowserRouter>
  );

  const createPostLink = await screen.findByText('Add Post');
  expect(createPostLink).toBeInTheDocument()
});
