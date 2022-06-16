import React from "react";
import "./DashboardNavbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Images/penguin-logo-full.png";
import Tilty from "react-tilty";

const DashboardNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-bg">
      <Navbar.Brand as={Link} to="/dashboard" className="justify-content-baseline">
        
          <Tilty max="1" scale={1.05}>
            <img src={logo} alt="penguin-icon" />
          </Tilty>
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end px-2"
      >
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className="text-nowrap"
              
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/trade"
              className="text-nowrap"
            
            >
              Trade
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/portfolio"
              
            >
              Portfolio
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="justify-content-end">
            <Nav.Link
              as={Link}
              to="/"
              
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DashboardNavBar;
