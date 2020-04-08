import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

const CategoryProducts = ({ match }) => {
  const categoryName = match.params.category;
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    fetch(`/api/succulents/${categoryName}`)
      .then(response => response.json())
      .then(response => setCategoryProducts(response))
      .catch(err => console.log("error when fetch succulents:" + err));
  }, []);
  return (
    <ProductList
      name={categoryName}
      products={categoryProducts}
      loading={false}
      categoryName={categoryName}
    />
  );
};

export default CategoryProducts;
