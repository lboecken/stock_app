import React from "react";
import "./HomepageNavbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../Images/penguin-logo-full.png";
import Tilty from "react-tilty";
import { Fade } from "react-reveal";

const NavBar = ({ pushedButton, setPushedButton, scrollBottom }) => {
  return (
    <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-bg">
      <Navbar.Brand as={Link} to="/" className="justify-content-baseline">
        <Fade>
          <Tilty max="1" scale={1.05}>
            <img src={logo} alt="penguin-icon" />
          </Tilty>
        </Fade>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              className="text-nowrap"
              onClick={() => {
                setPushedButton("signin");
                if (pushedButton === "signin") {
                  scrollBottom();
                }
              }}
            >
              Sign In
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => {
                setPushedButton("register");
                if (pushedButton === "register") {
                  scrollBottom();
                }
              }}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
