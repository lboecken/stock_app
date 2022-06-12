import React from "react";
// import "../Components/RegisterForm.css";
import "../RegisterForm/RegisterForm.css";
import logo from "../../Images/penguin-logo.png";
import userIcon from "../../Images/userIcon.png";
import pwdIcon from "../../Images/passwordIcon.png";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
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
                    <h3>Register</h3>
                  </div>
                  <div class="card-body">
                    <form>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
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
                          className="form-control"
                          placeholder="username"
                        ></input>
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <img
                              className="userIcon"
                              alt="userIcon"
                              src={pwdIcon}
                            />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                        ></input>
                      </div>

                      <div class="form-group">
                        <input
                          type="submit"
                          value="Register"
                          className="btn float-right login_btn"
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        ></input>
                        {/* <Button className='login_btn'>Register</Button> */}
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                      {/* Already have an account?<a href="/signin">Sign In</a> */}
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

export default RegisterForm;
