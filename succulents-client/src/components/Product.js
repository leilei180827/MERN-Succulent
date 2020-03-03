import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const replaceBlankBySymbol = strName => {
  return strName.trim().replace(/\s/g, "-");
};
function Product(props) {
  return (
    <ProductDiv className="col-9 col-md-6 col-lg-3 my-3  ">
      <Link
        to={{
          pathname:
            `/collections/${props.product.category}/` +
            replaceBlankBySymbol(props.product.name),
          state: {
            product: props.product
          }
        }}
      >
        <img
          className="card-img-top img-fluid"
          src={
            "/images/" +
            props.product.category.toLowerCase() +
            "/" +
            props.product.images[0]
          }
          alt={
            "/images/" +
            props.product.category.toLowerCase() +
            "/" +
            props.product.images[0]
          }
        />
      </Link>

      <div style={{ display: "table" }}>
        <div
          className="align-items-center text-capitalize"
          style={{ display: "table-cell" }}
        >
          <strong>{props.product.name}</strong>
        </div>
        <div
          className="align-items-center pl-2"
          style={{ display: "table-cell" }}
        >
          <span>$</span>
          {props.product.price.toFixed(2)}
        </div>
      </div>
    </ProductDiv>
  );
}
const ProductDiv = styled.div`
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 5px 1px #ffb400;
  }
`;
export default Product;
