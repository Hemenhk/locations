import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className={styles.Logo}>
          LOCATIONS
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            <NavLink
              className={styles.NavLink}
              to="/"
            >
              <i className="fa-solid fa-house"></i>
              Home
            </NavLink>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
