import React, { useState, useEffect } from "react";
const DashboardOrderItem = (props) => {
  const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };
  let total = 0;
  props.order.products.map((item) => {
    total += Number(item.succulent.price) * Number(item.quantity);
  });
  return (
    <div className="dashboard-order">
      <div className="row mx-1">
        <div className="col-md-3">
          Date:{" "}
          {new Date(props.order.createdAt).toLocaleDateString(
            "en-US",
            DATE_OPTIONS
          )}
        </div>
        <div className="col-md-2">
          Total: $<strong>{total}</strong>
        </div>
      </div>
      {props.order.products.map((item, index) => (
        <Item key={index} product={item} />
      ))}
      <div className="row mx-1">
        <div className="col-10">Address:{props.order.address}</div>
      </div>
    </div>
  );
};
const Item = (props) => {
  return (
    <div className="row mx-1 ">
      <div className="col-10  col-md-3">
        <img
          style={{ width: "2rem", height: "2rem" }}
          className="img-fluid"
          src={
            "/images/" +
            props.product.succulent.category.toLowerCase() +
            "/" +
            props.product.succulent.images[0]
          }
        />
      </div>
      <div className="col-10  col-md-3">
        <p className="text-uppercase">{props.product.succulent.name}</p>
      </div>
      <div className="col-10  col-md-2">
        <p className="text-uppercase">${props.product.succulent.price}</p>
      </div>
      <div className="col-10  col-md-1">
        <p className="text-uppercase">{props.product.quantity}</p>
      </div>
    </div>
  );
};
export default DashboardOrderItem;
