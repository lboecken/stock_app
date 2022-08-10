import React, { useEffect, useState } from "react";
import "../Homepage/Homepage.css";
import NavBar from "../Homepage/HomepageNavbar";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Tilty from "react-tilty";
import SignInForm from "../SignInForm/SignInForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const Homepage = () => {
  const scrollBottom = () => {
    const element = document.getElementById("buttonb");
    element.scrollIntoView({ block: "end", behavior: "smooth" });
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
          <NavBar
            pushedButton={pushedButton}
            setPushedButton={setPushedButton}
            scrollBottom={scrollBottom}
          />
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
                      Penguins are known to symbolize positive change and
                      adaptability. They are masters at maintaining order amidst
                      chaos. Trade Penguin aims to do just that by offering a
                      simple way to buy, trade and manage your stock portfolio.
                      While the stock market will always be unpredictable, Trade
                      Penguin can help you navigate the chaos with ease and
                      efficiency so that you can make informed decisions that
                      spur positive returns.
                    </p>
                    <h2 className="mb-5">
                      Start Investing Today!
                    </h2>
                  </div>
                </div>
              </div>
            </Fade>
            <Zoom>
              <div className="button-flex ">
                <Tilty max="1" scale={1.05}>
                  <div className="button-spacing">
                    <Button
                      className="btn p-3 get-started-btn"
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
