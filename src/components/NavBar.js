import axios from "axios";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  // This line of code allows us to access the user's logged in status
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  /**
   * The handleSignOut async function handles the user's log out.
   * If the user is successful, axios will reach the API logout endpoint
   * and the user's token will expire. If the attempt is unsuccessful,
   * an error will be loggen in the console.
   */
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/")
      setCurrentUser(null);
    } catch(err) {
      console.log(err)
    }
  };
  /**
   * This code uses a JSX fragment to allow React to specify what will be
   * rendered depending on the user's logged out status. If the user is logged out,
   * these two links will be rendered in the navbar. This creates good UX.
   */
  const loggedOutStatus = (
    <>
      <NavLink className={styles.NavLink} to="/signup">
        <i className="fa-solid fa-user-plus"></i>Sign Up
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: "blue" } : {};
        }}
        className={styles.NavLink}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Sign In
      </NavLink>
    </>
  );
  /**
   * This code uses a JSX fragment to allow React to specify what will be
   * rendered depending on the user's logged in status. If the user is logged out,
   * this link will be rendered in the navbar. This creates good UX.
   */
  const loggedInStatus = (
    <>
      <NavLink to="/posts" className={styles.NavLink}>
        <i class="fa-regular fa-square-plus"></i>Add Post
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
        <i class="fa-solid fa-right-from-bracket"></i>Sign Out
      </NavLink>
    </>
  );
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className={styles.Logo}>
          LOCATIONS
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            <NavLink className={styles.NavLink} to="/">
              <i className="fa-solid fa-house"></i>
              Home
            </NavLink>
            {/* This ternary operator allows this React app to render different
             nav links depending on the user's logged in status. 
             If currentUser = true, loggedInStatus will be rendered, else the 
             loggedOutStatus will be rendered instead. This allows for good UX */}
            {currentUser ? loggedInStatus : loggedOutStatus}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
