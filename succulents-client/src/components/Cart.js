import React from "react";
import { connect } from "react-redux";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
const Cart = props => {
  const { inCart } = props.cart;
  if (inCart.length > 0) {
    return (
      <React.Fragment>
        <CartColumns />
        <CartList products={inCart} />
        <CartTotal products={inCart} history={props.history} />
      </React.Fragment>
    );
  } else {
    return <EmptyCart />;
  }
};
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps, null)(Cart);
