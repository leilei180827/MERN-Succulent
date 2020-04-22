import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginReducer } from "../actions/userActions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedMessage, setLoggedMessage] = useState("");
  let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
    };
    fetch("/api/user/authenticate", {
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
            response.message + " will redirect to main page in seconds"
          );
          props.loginReducer(response);
          setTimeout(() => {
            setLoggedMessage("");
            history.push("/");
          }, 1000);
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-lg-6">
          <img
            className="img-fluid"
            src={process.env.PUBLIC_URL + "/images/2.jpg"}
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
          <h1 className="login login-header login-header-h1">Login</h1>
          <hr className="login login-hr" />
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
              className="btn login login-submit-button"
              value="Login"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { loginReducer })(Login);
