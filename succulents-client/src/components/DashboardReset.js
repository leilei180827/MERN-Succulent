import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
const DashboardReset = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPwd) {
      setFlashMessage("they're not the same,please enter again");
      return;
    }
    let newUser = {};
    console.log(props.user.userInfo._id);
    newUser.id = props.user.userInfo._id;
    newUser.password = password;
    fetch("/api/user/reset", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFlashMessage(response.message);
      })
      .catch((err) =>
        setFlashMessage("something went wrong, please try again later")
      );
    return;
  };
  return (
    <div className="card pb-2 mb-4">
      <div className="card-header">
        <h4 className="title">Reset</h4>
      </div>
      <div className="card-body">
        {flashMessage !== "" && (
          <React.Fragment>
            <p className="py-2" style={{ backgroundColor: "#5cb85c" }}>
              {flashMessage}
            </p>
          </React.Fragment>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 pr-md-1">
              <div className="form-group">
                <label>Enter New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="reset"
                  value={password}
                  onBlur={() => setFlashMessage("")}
                  onChange={(event) => {
                    // setFlashMessage("");
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 px-md-1">
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm"
                  value={confirmPwd}
                  onBlur={() => setFlashMessage("")}
                  onChange={(event) => {
                    // setFlashMessage("");
                    setConfirmPwd(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pr-md-1">
              <div className="form-group">
                <button type="submit" className="btn btn-full btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(DashboardReset);
