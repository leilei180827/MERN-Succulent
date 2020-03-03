import React from "react";
import CartItem from "./CartItem";
const CartList = props => {
  return (
    <React.Fragment>
      <div className="container-fluid text-center d-lg-block">
        {props.products.map((item, index) => (
          <CartItem key={index} product={item} index={index} />
        ))}
      </div>
    </React.Fragment>
  );
};
export default CartList;
