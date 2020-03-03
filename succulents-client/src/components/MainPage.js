import React, { useState, useEffect } from "react";
import AppCarousel from "./slides";
import ProductList from "./ProductList";

const MainPage = props => {
  const [lateProducts, setLatestProducts] = useState([]);
  const [echeveriaProducts, setEcheveriaProducts] = useState([]);
  const port = process.env.PORT || 9000;
  console.log("mainpage:" + port);
  useEffect(() => {
    fetch(`http://localhost:${port}/api/succulents/new`)
      .then(response => response.json())
      .then(response => {
        setLatestProducts(response);
      })
      .catch(err => console.log("error when fetch succulents:" + err));
    fetch("http://localhost:9000/api/succulents/echeveria")
      .then(response => response.json())
      .then(response => {
        setEcheveriaProducts(response);
      })
      .catch(err => console.log("error when fetch succulents:" + err));
  }, []);
  return (
    <React.Fragment>
      <AppCarousel />
      <ProductList
        products={lateProducts.slice(0, 8)}
        categoryName={"New"}
        loading={false}
      />
      <ProductList
        products={echeveriaProducts.slice(0, 8)}
        categoryName={"Echeveria"}
        loading={false}
        partDisplayed={true}
      />
    </React.Fragment>
  );
};
export default MainPage;
