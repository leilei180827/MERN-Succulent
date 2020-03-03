import React from "react";
import { connect } from "react-redux";
import { increment, decrement, remove_from_cart } from "../actions/cartActions";

const CartItem = props => {
  return (
    <div className="row mb-1 ">
      <div className="col-10 mx-auto col-lg-2">
        <img
          style={{ width: "3rem", heigth: "3rem" }}
          className="img-fluid"
          src={props.product.image}
          alt={props.product.image}
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <p className="text-uppercase">{props.product.name}</p>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <p className="text-uppercase">{props.product.price}</p>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div className="d-flex justify-content-center">
          <div>
            <span
              className="btn btn-dark mx-1"
              onClick={() => props.decrement(props.product.id)}
            >
              -
            </span>
            <span className="btn btn-outline-dark mx-1">
              {props.product.quantity}
            </span>
            <span
              className="btn btn-dark mx-1"
              onClick={() => props.increment(props.product.id)}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span
          className="btn btn-danger mx-1"
          onClick={() => props.remove_from_cart(props.product.id)}
        >
          X
        </span>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <p className="text-uppercase">
          {Number(props.product.price) * Number(props.product.quantity)}
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps, {
  increment,
  remove_from_cart,
  decrement
})(CartItem);
