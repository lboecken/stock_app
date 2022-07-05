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
import io from "socket.io-client";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullPassword, setFullPassword] = useState(true);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  let navigate = useNavigate();

  // const socket = io.connect();

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
          localStorage.setItem("user", username);
          window.location.reload();
          // pushToken(data);
          // socket.emit("activateUser", { username: username });
        })
        .catch((error) => {
          console.log("There was an error!", error);
          setWrongDetails(true);
        });
    } else {
      setFullPassword(false);
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
                    <h3>Register</h3>
                    {!fullPassword ? (
                      <p className="text-center mt-4 wrongDetails">
                        Username and/or password must be at least 6 characters
                      </p>
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
                              alt="userIcon"
                              src={pwdIcon}
                            />
                          </span>
                        </div>
                        <input
                          type="password"
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
                              navigate("/dashboard");
                            }
                          }}
                          value={password}
                        ></input>
                      </div>

                      <div class="form-group">
                        <Button
                          className="btn float-right login_btn"
                          onClick={() => {
                            handleClick();
                            navigate("/dashboard");
                          }}
                        >
                          Register
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-center links">
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
