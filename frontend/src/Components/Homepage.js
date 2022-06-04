import React, { useEffect, useState } from "react";
import "../Components/Homepage.css";
import NavBar from "./HomepageNavbar";
import { Button } from "react-bootstrap";
// import { Nav } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Tilty from "react-tilty";
// import backgroundVideo from "../Images/penguin-video-3.mp4"
import SignInForm from "../Components/SignInForm";
import RegisterForm from "../Components/RegisterForm";


const Homepage = () => {

 

  const scrollBottom = () => {
    const element = document.getElementById("buttonb");
    element.scrollIntoView({block: 'end', behavior: 'smooth'});
    
  };

  const [pushedButton, setPushedButton] = useState("");

  useEffect(() => {
    if (pushedButton === "signin" || pushedButton === "register") {
      scrollBottom();
    }
  }, [pushedButton]);

  return (
    <div className="maincontainer bg-image-homepage">
      <div className="container-fluid">
        <div className="row no-gutter">
          <NavBar pushedButton={pushedButton} setPushedButton={setPushedButton} scrollBottom={scrollBottom}/>
          <div>
    
            <Fade top duration={1000} delay={100} distance="30px">
              <div className="container">
                <div className="row">
                  <div className="title">
                    <h1 className="display-5 text-margin">
                      Welcome to Trade Penguin!
                    </h1>
                    <br></br>
                    <p className="align-items-center justify-content-center mb-4">
                      Penguins, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure <br></br>dolor in reprehenderiin voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non
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
              <div className="button-flex ">
                <Tilty max="1" scale={1.05}>
                  {/* <Nav.Link as={NavLink} to={setPushedButton("register")} onClick={() => {
                    
                  }} >
                    
                  </Nav.Link> */}
      
                  <div className="button-spacing">
                  <Button className="btn p-3 get-started-btn"
                    onClick={() => {
                      setPushedButton("register");
                      if (pushedButton === "register") {
                        scrollBottom();
                      }
                      
                    }}
                    >

                      New Here? <br></br>
                      Get Started!
                    </Button>
                  </div>
                   
                </Tilty>

                <Tilty max="1" scale={1.05}>
                  {/* <Nav.Link
                    as={NavLink}
                    to="/signin"
                    className="text-nowrap"
                  ></Nav.Link> */}

                  <div className="button-spacing">
                    <Button
                      className="btn p-3 get-started-btn"
                      onClick={() => {
                        setPushedButton("signin");
                        if (pushedButton === "signin") {
                        scrollBottom();
                      }
                        
                      }}
                    >
                      Returning?<br></br>
                      View Portfolio
                    </Button>
                  </div>
                </Tilty>
              </div>
            </Zoom>
          </div>
          {pushedButton === "signin" ? (
            <div id="buttonb">
              <SignInForm />
            </div>
          ) : pushedButton === "register" ? (
            <div id="buttonb">
            <RegisterForm />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
  
    </div>
  );
};

export default Homepage;
