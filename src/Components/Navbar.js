import React from 'react';
import "./Navbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from '../Images/penguin-logo.png';
import Tilty from "react-tilty";

const NavBar = () => {
  return (
  
    
      <Navbar collapseOnSelect expand="xl" variant="light">
        <Navbar.Brand as={Link} to="/">
          <Tilty className="tilty shadow-2" scale={1.05}>
            <img className="home_icon" src={logo} alt="penguin-icon" />
          Trade Penguin
          </Tilty>
        </Navbar.Brand>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/" exact="true">
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={NavLink} to="/signin" className="text-nowrap">
                  Sign In
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={NavLink} to="/register" >
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;
