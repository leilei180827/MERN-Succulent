import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { store_recipient_info } from "../actions/recipientActions";
const CheckoutAddress = (props) => {
  let history = useHistory();
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
  });
  const handleClickUseDefaultAddress = () => {
    setAddress({
      ...address,
      name: props.user.userInfo.username,
      street: props.user.userInfo.address.street,
      city: props.user.userInfo.address.city,
      state: props.user.userInfo.address.state,
      postcode: props.user.userInfo.address.postcode,
    });
  };
  const handleUserInputChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };
  const handleNextClick = () => {
    props.store_recipient_info(address);
    history.push("/cart/pay");
  };
  return (
    <div className="container">
      <div className="row mb-2">
        <h4 className="col-10 text-capitalize">Fill Your Address</h4>
        {props.user.userInfo.address && (
          <div className="col-10 mt-1">
            <input
              type="radio"
              id="defaultAddress"
              name="defaultAddress"
              value="use default address"
              onClick={handleClickUseDefaultAddress}
            />
            <label htmlFor="defaultAddress">use default address</label>
          </div>
        )}
      </div>
      <div className="row my-2">
        <label className="col-2" htmlFor="name">
          Name:{" "}
        </label>
        <input
          className="col-6"
          type="text"
          value={address.name}
          name="name"
          id="name"
          onChange={handleUserInputChange}
        />
      </div>
      <div className="row my-2">
        <label className="col-2" htmlFor="street">
          Street:{" "}
        </label>
        <input
          className="col-6"
          type="text"
          value={address.street}
          name="street"
          id="street"
          onChange={handleUserInputChange}
        />
      </div>
      <div className="row my-1">
        <label className="col-2" htmlFor="city">
          City:{" "}
        </label>
        <input
          className="col-6"
          type="text"
          value={address.city}
          name="city"
          id="city"
          onChange={handleUserInputChange}
        />
      </div>
      <div className="row my-2">
        <label className="col-2" htmlFor="postcode">
          Postcode:{" "}
        </label>
        <input
          className="col-6"
          type="text"
          value={address.postcode}
          name="postcode"
          id="postcode"
          onChange={handleUserInputChange}
        />
      </div>
      <div className="row my-2">
        <div className="col-2">
          <ButtonContainer onClick={() => history.goBack()}>
            Back
          </ButtonContainer>
          <ButtonContainer onClick={handleNextClick}>Next</ButtonContainer>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  recipient: state.recipient,
  user: state.user,
});
export default connect(mapStateToProps, { store_recipient_info })(
  CheckoutAddress
);
