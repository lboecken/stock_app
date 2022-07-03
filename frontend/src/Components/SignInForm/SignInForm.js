import React from "react";
import "../SignInForm/SignInForm.css";
import logo from "../../Images/penguin-logo.png";
import userIcon from "../../Images/userIcon.png";
import pwdIcon from "../../Images/passwordIcon.png";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

const SignInForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [wrongDetails, setWrongDetails] = useState(false);


  let navigate = useNavigate();

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <Fade bottom duration={1000} delay={100} distance="30px">
            <div class="container">
              <div class="d-flex justify-content-center">
                <div class="card">
                  <div className="text-center pt-3">
                    <img
                      src={logo}
                      className="penguin-logo-signin"
                      alt="penguin-logo"
                    ></img>
                  </div>
                  <div className="title-spacing">
                    <h3>Sign In</h3>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            {" "}
                            <img
                              className="userIcon"
                              alt="userIcon"
                              src={userIcon}
                            />
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="username"
                        ></input>
                      </div>
                      <div class="input-group form-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <img
                              className="userIcon"
                              alt="userIcon"
                              src={pwdIcon}
                            />
                          </span>
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="password"
                        ></input>
                      </div>

                      <div class="form-group">
                        <input
                          type="submit"
                          value="Sign In"
                          className="btn float-right login_btn"
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        ></input>
                        {/* <Button className='login_btn'>Register</Button> */}
                      </div>
                    </form>
                  </div>
                  <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                      {/* Don't have an account?<a href="/register">Sign Up!</a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
