import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store_user_info } from "../actions/userActions";
const DashboardProfile = (props) => {
  const [newUser, setNewUser] = useState({
    username: props.user.userInfo.username,
    email: props.user.userInfo.email,
  });
  const [newAddress, setNewAddress] = useState({
    street: props.user.userInfo.address.street,
    suburb: props.user.userInfo.address.suburb,
    city: props.user.userInfo.address.city,
    state: props.user.userInfo.address.state,
    postcode: props.user.userInfo.address.postcode,
  });
  const [flashMessage, setFlashMessage] = useState("");
  const handleUserInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddressInputChange = (event) => {
    console.log(event.target.name);
    console.log(newAddress);
    setNewAddress({
      ...newAddress,
      [event.target.name]: event.target.value,
    });
  };

  const userInfoHasChanged = () => {
    newUser.username &&
      props.user.userInfo.username === newUser.username &&
      delete newUser.username;
    newUser.email &&
      props.user.userInfo.email === newUser.email &&
      delete newUser.email;
    newAddress.street &&
      props.user.userInfo.address.street === newAddress.street &&
      delete newAddress.username;
    newAddress.suburb &&
      props.user.userInfo.address.suburb === newAddress.suburb &&
      delete newAddress.suburb;
    newAddress.city &&
      props.user.userInfo.address.city === newAddress.city &&
      delete newAddress.city;
    newAddress.state &&
      props.user.userInfo.address.state === newAddress.state &&
      delete newAddress.state;
    newAddress.postcode &&
      props.user.userInfo.address.postcode === newAddress.postcode &&
      delete newAddress.postcode;
    return;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    userInfoHasChanged();
    if (Object.keys(newAddress).length !== 0) {
      newUser.address = newAddress;
    }
    if (Object.keys(newUser).length === 0) {
      return;
    }
    newUser._id = props.user.userInfo._id;
    fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.success && props.store_user_info(response.user);
        setFlashMessage(response.message);
      })
      .catch((err) =>
        setFlashMessage("something went wrong, please try again later")
      );
    return false;
  };
  return (
    <div className="card pb-2 mb-4">
      <div className="card-header">
        <h4 className="title">Edit</h4>
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
          <h5 className="badge badge-primary">Basic Information</h5>
          <div className="row">
            <div className="col-md-4 pr-md-1">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={newUser.username}
                  name="username"
                  onChange={handleUserInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 px-md-1">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={newUser.email}
                  name="email"
                  onChange={handleUserInputChange}
                />
              </div>
            </div>
          </div>
          <h5 className="badge badge-primary">Address</h5>
          <div className="row">
            <div className="col-md-4 pr-md-1">
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="street"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 px-md-1">
              <div className="form-group">
                <label>Suburb</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="suburb"
                  name="suburb"
                  value={newAddress.suburb}
                  onChange={handleAddressInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 pl-md-1">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pr-md-1">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="state"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 px-md-1">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value="Australia"
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-4 pl-md-1">
              <div className="form-group">
                <label>Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="3000"
                  name="postcode"
                  value={newAddress.postcode}
                  onChange={handleAddressInputChange}
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
export default connect(mapStateToProps, { store_user_info })(DashboardProfile);
