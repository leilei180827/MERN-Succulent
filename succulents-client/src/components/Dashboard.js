import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutReducer, store_user_info } from "../actions/userActions";
import { clear_cart } from "../actions/cartActions";
import { clear_recipient } from "../actions/recipientActions";
import DashboardSidebarNav from "./DashboardSidebarNav";
import DashboardProfile from "./DashboardProfile";
import DashboardOrders from "./DashboardOrders";
import DashboardReset from "./DashboardReset";

const Dashboard = (props) => {
  const [sidebarSelected, setSidebarSelected] = useState("");
  const [user, SetUser] = useState({});
  let history = useHistory();
  const onSelectSidebar = (name) => {
    setSidebarSelected(name);
  };
  const userLogout = () => {
    history.push("/");
  };
  const switchAccordingSidebarMenu = () => {
    switch (sidebarSelected) {
      case "profile":
        return <DashboardProfile />;
      case "orders":
        return <DashboardOrders />;
      case "reset":
        return <DashboardReset />;
      case "logout":
        userLogout();
      default:
        return <DashboardReset />;
      // <p>something went wrong</p>;
    }
  };
  useEffect(() => {
    if (!props.user.token) {
      history.push("/");
      return;
    }
    fetch("/api/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: props.user.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        props.store_user_info(response.user);
        SetUser(response.user);
      })
      .catch((err) => setSidebarSelected("something went wrong"));
    return () => {
      props.logoutReducer();
      props.clear_cart();
      props.clear_recipient();
    };
  }, []);
  return (
    <div className="container">
      <div className="row dashboard-header py-2">
        <h3 className="col-12">Dashboard</h3>
      </div>
      <div className="row dashboard-panel">
        <div className="col-2 dashboardSidebarNav">
          <DashboardSidebarNav onSelectSidebar={onSelectSidebar} />
        </div>
        <div className="col-10 dashboardContent">
          {switchAccordingSidebarMenu()}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  logoutReducer,
  store_user_info,
  clear_cart,
  clear_recipient,
})(Dashboard);
