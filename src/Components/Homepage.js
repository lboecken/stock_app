import React from 'react'
import "../Components/Homepage.css"
import NavBar from "./Navbar";
import { Button } from "react-bootstrap";
import {  Nav} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


const Homepage = () => {
  return (
    
    <div className="maincontainer bg-image-homepage">
    <div className="container-fluid">
      <div className="row no-gutter">
      <NavBar />
        <div>
    
          
            <div className="container">
              <div className="row">
                <div className="title">
                  <h1 className="display-5 text-margin">Welcome to Trade Penguin!</h1>
                  <br></br>
                  <p className=" align-items-center justify-content-center mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat. Duis aute irure dolor in reprehenderiin voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non
                  </p>
                  <p className=" mb-4">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat. Duis aute irure dolor in reprehenderiin voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non */}
                  </p>
                </div>
              </div>
            </div>

            <div className='button-flex'>

            <Nav.Link as={NavLink} to="/register" >
            <Button className='btn p-3 get-started-btn mx-auto'>New Here? <br></br>
            Get Started!</Button>
                  
                </Nav.Link>

            <Nav.Link as={NavLink} to="/signin" className="text-nowrap">
                  
            <div className='button-spacing'>

            <Button className='btn p-3 mx-auto get-started-btn' to="/signin">Returning?<br></br>
            View Portfolio</Button>
            </div>
                </Nav.Link>

            </div>

          </div>
    
        </div>
       
      </div>
    </div>
   
  )
}

export default Homepage