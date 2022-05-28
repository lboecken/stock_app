import React from 'react'
import "../Components/Homepage.css"
import NavBar from "./Navbar";
import { Button } from "react-bootstrap";
import {  Nav} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Tilty from "react-tilty";
// import backgroundVideo from "../Images/penguin-video-3.mp4"

const Homepage = () => {
  return (
    
    <div className="maincontainer bg-image-homepage">
    <div className="container-fluid">
      <div className="row no-gutter">
      <NavBar />
        <div>
        {/* <video autoPlay loop muted id="video">
          <source src={backgroundVideo} type="video/mp4"/>
        </video>  */}
       
    
        <Fade top duration={1000} delay={100} distance="30px">
            <div className="container">
        
       
              <div className="row">
                <div className="title">
                  <h1 className="display-5 text-margin">Welcome to Trade Penguin!</h1>
                  <br></br>
                  <p className="align-items-center justify-content-center mb-4">
                  Penguins, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat. Duis aute irure <br></br>dolor in reprehenderiin voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
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
            </Fade>
                  <Zoom>
            <div className='button-flex'>
            <Tilty max="1" scale={1.05}>

            <Nav.Link as={NavLink} to="/register" >
            <Button className='btn p-3 get-started-btn mx-auto'>New Here? <br></br>
            Get Started!</Button>
                  
                </Nav.Link>

          </Tilty>

          <Tilty max="1" scale={1.05}>
            <Nav.Link as={NavLink} to="/signin" className="text-nowrap">
                  
            <div className='button-spacing'>

            <Button className='btn p-3 mx-auto get-started-btn' to="/signin">Returning?<br></br>
            View Portfolio</Button>
            </div>
                </Nav.Link>
            </Tilty>
            </div>

          </Zoom>
        
          </div>
    
        </div>
       
      </div>
    </div>
   
  )
}

export default Homepage