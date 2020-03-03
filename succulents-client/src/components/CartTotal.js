import React from "react";
import PaypalCheckout from "./PaypalCheckout";
const CartTotal = props => {
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
        <div className="col-10  offset-lg-10 col-lg-2">
          <PaypalCheckout total={total} history={props.history} />
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
