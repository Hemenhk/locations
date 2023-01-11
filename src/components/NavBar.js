import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  // This line of code allows us to access the user's logged in status
  const currentUser = useContext(CurrentUserContext);


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
  const loggedInStatus = <>{currentUser?.username}</>;
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
