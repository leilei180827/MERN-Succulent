import React, { Component } from "react";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { add_to_cart } from "../actions/cartActions";
class ProductInfo extends Component {
  render() {
    const { product } = this.props.location.state;
    const imageSrc =
      "/images/" + product.category.toLowerCase() + "/" + product.images[0];
    console.log("detailInfo:");
    console.log(product._id);

    let alreadyInCart = this.props.cart.inCart.find(
      element => element.id === product._id
    )
      ? true
      : false;
    console.log(alreadyInCart);
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <img src={imageSrc} className="img-fluid" />
          </div>
          {/* prdoduct info */}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h1 className="mb-2"> {product.name}</h1>
            <h4 className="text-blue">
              <strong>
                price : <span>$</span>
                {product.price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              some info about product :
            </p>
            <p className="text-muted lead">{product.description}</p>
            {/* buttons */}
            <div>
              {alreadyInCart ? (
                <Link to="/">
                  <ButtonContainer>keep shopping</ButtonContainer>
                </Link>
              ) : (
                ""
              )}
              <ButtonContainer
                cart
                disabled={alreadyInCart ? true : false}
                onClick={() => {
                  let cartItem = {
                    id: product._id,
                    image: imageSrc,
                    name: product.name,
                    quantity: 1,
                    price: product.price
                  };
                  this.props.add_to_cart(cartItem);
                  //this.props.openModal(product.id);
                }}
              >
                {alreadyInCart ? "already in cart" : "add to cart"}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToprops = state => ({
  cart: state.cart
});
export default connect(mapStateToprops, { add_to_cart })(ProductInfo);
