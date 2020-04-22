import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PaypalCheckout from "./PaypalCheckout";
import { ButtonContainer } from "./Button";
const CheckoutPay = (props) => {
  const [flashMessage, setFlashMessage] = useState("");
  let history = useHistory();
  let total = 0;
  console.log(props);
  props.products.map(
    (item) => (total += Number(item.price) * Number(item.quantity))
  );
  const composeAddress = (recipient) => {
    let result = "";
    recipient.name && (result += recipient.name);
    recipient.street && (result += "," + recipient.street);
    recipient.city && (result += "," + recipient.city);
    recipient.state && (result += "," + recipient.state);
    recipient.postcode && (result += "," + recipient.postcode);
    return result;
  };
  return (
    <div className="container-fluid">
      {flashMessage != "" && (
        <React.Fragment>
          <p className="py-2" style={{ backgroundColor: "#5cb85c" }}>
            {flashMessage}
          </p>
        </React.Fragment>
      )}
      <div className="row ">
        <div className="col-10 mb-2">
          <h5 className="text-capitalize">summary of your Orders</h5>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-10">
          <h6 className="text-capitalize">Products</h6>
        </div>
      </div>
      {props.products.map((item, index) => (
        <ListItemInSummary product={item} key={index} />
      ))}
      <div className="row my-2">
        <div className="col-10">
          <h6 className="text-capitalize">Personal Information</h6>
        </div>
        <div className="col-10 my-1">
          <p className="text-capitalize">recipient name:</p>
          <p>{props.recipient.name}</p>
        </div>
        <div className="col-10 my-1">
          <p className="text-capitalize">recipient address:</p>
          <p>{props.recipient.address}</p>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-10  col-lg-2">
          <ButtonContainer onClick={() => history.goBack()}>
            Back
          </ButtonContainer>
        </div>
        <div className="col-10  col-lg-2">
          <ButtonContainer>
            <PaypalCheckout
              total={total}
              history={props.history}
              setFlashMessage={setFlashMessage}
            />
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};
const ListItemInSummary = (props) => {
  return (
    <div className="row">
      <div className="col-10  col-lg-2">
        <p className="text-uppercase">{props.product.name}</p>
      </div>
      <div className="col-10  col-lg-2">
        <p className="text-uppercase">${props.product.price}</p>
      </div>
      <div className="col-10  col-lg-2">
        <p className="text-uppercase">{props.product.quantity}</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  recipient: state.recipient,
  products: state.cart.inCart,
});
export default connect(mapStateToProps, {})(CheckoutPay);
