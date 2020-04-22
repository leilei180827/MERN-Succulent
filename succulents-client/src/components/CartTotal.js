import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PaypalCheckout from "./PaypalCheckout";
import CheckoutAddress from "./CheckoutAddress";
import { ButtonContainer } from "./Button";
const CartTotal = (props) => {
  let history = useHistory();
  // const handleSaveOrders = () => {
  //   let products = [];
  //   props.products.map((item, index) => {
  //     products.push({ succulentName: item.name, quantity: item.quantity });
  //   });
  //   let address =
  //     recipient.street +
  //     "," +
  //     recipient.city +
  //     "," +
  //     recipient.state +
  //     "," +
  //     recipient.postcode;
  //   let userId = props.user.userInfo;
  //   if (props.user.userInfo) {
  //     console.log("anonymous user");
  //   }
  //   let orders = {
  //     userId: userId,
  //     address: address,
  //     products: products,
  //   };
  //   fetch("api/add/orders", {
  //     method: "POST",
  //     body: JSON.stringify(orders),
  //     headers: {
  //       "content-type": "application.json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       response.success && history.push("checkout/success");
  //       !response.success && console.log("something went wrong");
  //     })
  //     .catch((error) => {
  //       console.log("something went wrong");
  //     });
  //   console.log("going to save orders on database");
  // };
  const handleNextClick = () => {
    history.push("/cart/address");
  };
  let total = 0;
  props.products.forEach(
    (item, index) => (total += Number(item.price) * Number(item.quantity))
  );
  return (
    <div className="container-fluid text-center">
      <div className="row ">
        <div className="col-10  offset-lg-10 col-lg-2 mt-1 mb-3">
          $<strong>{total}</strong>
        </div>
        <div className="col-10  offset-lg-10 col-lg-2 mt-1 mb-3">
          <ButtonContainer onClick={handleNextClick}>Next</ButtonContainer>
        </div>
      </div>
      {/* <div className="row">
        <CheckoutAddress />
      </div>
      <div className="row mt-2">
        <div className="col-10  offset-lg-10 col-lg-2">
          <PaypalCheckout total={total} history={props.history} />
        </div>
      </div> */}
    </div>
  );
};
export default CartTotal;
