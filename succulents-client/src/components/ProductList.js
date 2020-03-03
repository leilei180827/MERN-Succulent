import React, { Component } from "react";
import Product from "./Product";
import styled from "styled-components";

class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <a href={"/collections/" + this.props.categoryName}>
                <CategoryTitle>{this.props.categoryName}</CategoryTitle>
              </a>
            </div>
            <div>
              <a href={"/collections/" + this.props.categoryName}>
                <CategoryMoreButton>See More</CategoryMoreButton>
              </a>
            </div>
          </div>

          {this.props.loading ? (
            <div>Loading items...</div>
          ) : (
            <div className="row mb-2">
              {this.props.products.map((product, index) => (
                <Product
                  product={product}
                  key={index}
                  categoryName={this.props.categoryName}
                />
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
const CategoryTitle = styled.h2`
  color: black;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0;
  &:hover {
    color: #ffb400;
    margin: 0;
  }
`;
const CategoryMoreButton = styled.button`
  text-transform: capitalize;
  font-size: 1rem;
  background: transparent;
  border: 0.05rem solid #ffb400;
  border-color: ${props => (props.cart ? "#ffb400" : "#ffb400")};
  color: ${props => (props.cart ? "#ffb400" : "#ffb400")};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  outline-color: red;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: #ffb400;
    background: ${props => (props.cart ? "#ffb400" : "#ffb400")};
    color: #2994b2;
  }
  &:focus {
    outline: none;
  }
`;
export default ProductList;
