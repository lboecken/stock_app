import React from "react";
import "./DashboardNavbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Images/penguin-logo-full.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tilty from "react-tilty";
import useUser from "../useUser";
import useToken from "../useToken";

const DashboardNavBar = () => {
  const { signedInUser, signOutUser } = useUser();
  const { removeToken } = useToken();

  let navigate = useNavigate();

  const logOut = () => {
    const data = {
      username: signedInUser,
    };

    axios
      .post("/api/logout", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        removeToken();
        signOutUser();
        // socket.emit("deactivateUser", { username: signedInUser });
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log("An error was caught!", error);
      });
  };

  return (
    <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-bg">
      <Navbar.Brand
        as={Link}
        to="/dashboard"
        className="justify-content-baseline"
      >
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
            <Nav.Link as={Link} to="/dashboard" className="text-nowrap">
              Dashboard
            </Nav.Link>
          </Nav.Item>
{/* 
          <Nav.Item>
            <Nav.Link href="/trade" className="text-nowrap">
              Trade
            </Nav.Link>
          </Nav.Item> */}

          <Nav.Item>
            <Nav.Link as={Link} to="/trade" className="text-nowrap">
              Trade
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/portfolio">
              Portfolio
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="justify-content-end">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => {
                console.log("LogOut Button Clicked");
                logOut();
              }}
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
