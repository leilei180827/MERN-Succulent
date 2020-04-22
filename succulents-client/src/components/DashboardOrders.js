import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DashboardOrderItem from "./DashboardOrderItem";
const DashboardOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");
  useEffect(() => {
    let data = { userId: props.user.userInfo._id };
    fetch("api/user/search/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.success && setOrders(response.orders);
        !response.success && setFlashMessage(response.message);
      })
      .catch((error) => {
        setFlashMessage("something went wrong, please try again" + error);
      });
  }, []);
  return (
    <div className="card pb-2 mb-4">
      <div className="card-header">
        <h5 className="title">Your Orders</h5>
        <p className="category">latest first</p>
      </div>
      <div className="card-body all-icons">
        {orders.map((item, index) => (
          <DashboardOrderItem key={index} order={item} index={index} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(DashboardOrders);
