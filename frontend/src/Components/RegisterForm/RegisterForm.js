import React from "react";
import "../RegisterForm/RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";
import { Button } from "react-bootstrap";
import logo from "../../Images/penguin-logo.png";
import userIcon from "../../Images/userIcon.png";
import pwdIcon from "../../Images/passwordIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };


  const pushToken = (data) => {
    axios
      .post("/api/token", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };

  const handleClick = () => {
    const data = {
      username: username,
      password: password,
    };

    if (username.length >= 6 && password.length >= 6) {
      axios
        .post("/api/users", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res;
        })
        .then((res) => {
          pushToken(data);
          localStorage.setItem("user", username);
        })
        .catch((error) => {
          console.log("There was an error!", error);

          setRegisterError("WrongDetails");
        });
    } else {
      setRegisterError("NoFullPassword");
    }
  };

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
                    <h3 className="mb-3">Register</h3>

                    {registerError === "NoFullPassword" ? (
                      <span className="text-center wrongDetails">
                        Username and/or password must be at least 6 characters.
                      </span>
                    ) : (
                      ""
                    )}

                    {registerError === "WrongDetails" ? (
                      <span className="text-center wrongDetails">
                        Username is already taken. Please choose another.
                      </span>
                    ) : (
                      ""
                    )}
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
                          placeholder="Username"
                          name="userName"
                          id="userName"
                          minlength="6"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        ></input>
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <img
                              className="userIcon"
                              alt="passswordIcon"
                              src={pwdIcon}
                            />
                          </span>
                        </div>
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          id="password"
                          minlength="6"
                          maxLength="15"
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              handleClick();
                            }
                          }}
                          value={password}
                        ></input>
                        <span className="passwordEyeIcon">
                          <FontAwesomeIcon
                            icon={passwordShown ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                          />
                        </span>
                      </div>

                      <div class="form-group">
                        <input
                          // type="submit"
                          value="Register"
                          className="btn float-right login_btn"
                          onClick={() => {
                            handleClick();
                          }}
                        ></input>

                        {/* <Button
                          className="btn float-right login_btn"
                          onClick={() => {
                            handleClick();
                          }}
                        >
                          Register
                        </Button> */}
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-center links"></div>
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
