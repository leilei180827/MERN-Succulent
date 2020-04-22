import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FlashMassage } from "react-flash-message";
import styled from "styled-components";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedMessage, setLoggedMessage] = useState("");
  let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    // if (validateCheck()) {
    //   console.log("fill right things when login");
    // }
    let user = {
      username: username,
      email: email,
      password: password,
    };
    fetch("/api/user/register", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(user), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setLoggedMessage(
            response.message + " will redirect to login page in seconds"
          );
          setTimeout(() => {
            setLoggedMessage("");
            history.push("/login");
          }, 1500);
        } else {
          console.log("false");
          setLoggedMessage(
            "unfortunately something went wrong " + response.message
          );
          return;
        }
      })
      .catch((err) => {
        setLoggedMessage("unfortunately something went wrong please try again");
        return;
      });
    return false;
  };

  const validateCheck = () => {
    console.log("validate check");
    return true;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-lg-6">
          <img
            className="img-fluid"
            src={process.env.PUBLIC_URL + "/images/1.jpg"}
            alt="React Bootstrap logo"
          />
        </div>
        <div className="col-md-10 col-lg-6">
          {loggedMessage != "" && (
            <React.Fragment>
              <p className="py-2" style={{ backgroundColor: "#5cb85c" }}>
                {loggedMessage}
              </p>
            </React.Fragment>
          )}
          <h1 className="register register-header register-header-h1">
            Register
          </h1>
          <small className="register register-header register-header-small">
            Please fill in this form to create an account.
          </small>
          <hr className="register register-hr" />
          <form className="mt-1 mb-4" onSubmit={onSubmit} target="nm_iframe">
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                placeholder="Enter username"
                onFocus={(event) => setLoggedMessage("")}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                onFocus={(event) => setLoggedMessage("")}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onFocus={(event) => setLoggedMessage("")}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <input
              type="submit"
              className="btn register register-submit-button"
              value="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
