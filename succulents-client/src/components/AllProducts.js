import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  // const indexOfLast = currentPage * productsPerPage;
  // const indexOfFirst = indexOfLast - productsPerPage;
  // const currentProducts = totalProducts.slice(indexOfFirst, indexOfLast);
  useEffect(() => {
    fetch("api/succulents/")
      .then(response => response.json())
      .then(response => {
        setProducts(response);
      })
      .catch(err => console.log("error when fetch succulents:" + err));
  }, []);
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };
  return (
    <React.Fragment>
      {products.map((categoryProducts, index) => (
        <ProductList
          key={categoryProducts._id}
          categoryName={categoryProducts._id}
          products={categoryProducts.succulents.slice(0, 4)}
          loading={false}
          partDisplayed={true}
        />
      ))}
      {/* <Pagination
        total={totalProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      /> */}
    </React.Fragment>
  );
};

export default AllProducts;
