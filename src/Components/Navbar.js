import React from 'react';
import "./Navbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from '../Images/penguin-logo.png';
import Tilty from "react-tilty";

const NavBar = () => {
  return (
  
  
      <Navbar collapseOnSelect expand="xl" variant="dark" className='navbar-bg'>
        
        <Navbar.Brand as={Link} to="/" className='justify-content-baseline'>
          <Tilty className="tilty shadow-2" scale={1.05}>
            <img src={logo} alt="penguin-icon" />
          Trade Penguin
          </Tilty>
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Nav>
              {/* <Nav.Item>
                <Nav.Link as={NavLink} to="/" exact="true">
                  Home
                </Nav.Link>
              </Nav.Item> */}

              <Nav.Item>
                <Nav.Link as={NavLink} to="/signin" className="text-nowrap">
                  Sign In
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={NavLink} to="/register" >
                  Register
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        
      </Navbar>
      
  );
};

export default NavBar;
