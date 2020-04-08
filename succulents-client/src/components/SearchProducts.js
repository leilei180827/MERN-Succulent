import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import queryString from "query-string";
// var url = new URL('https://sl.se')

// var params = { lat: 35.696233, long: 139.570431 } // or:
// var params = [['lat', '35.696233'], ['long', '139.570431']]

// url.search = new URLSearchParams(params).toString();

// fetch(url)

const SearchProducts = props => {
  const keyword = queryString.parse(props.location.search).q;
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetch(`api/search?keyword=${keyword}`)
      .then(response => response.json())
      .then(response => setSearchResults(response))
      .catch(err => console.log("error when fetch succulents:" + err));
  }, []);
  if (searchResults.length == 0) {
    return (
      <div className="my-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-capitalize">
            <h1>No search results</h1>
            <h3>
              Your search for <strong>{keyword}</strong> did not yield any
              results. Try searching for something else.
            </h3>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <ProductList
        name="Search Result"
        products={searchResults}
        loading={false}
        categoryName={""}
      />
    );
  }
};

export default SearchProducts;
