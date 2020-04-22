import React, { useState, useEffect } from "react";
const DashboardSidebarNav = (props) => {
  const logout = () => {
    console.log("logout");
  };
  return (
    <ul>
      <li
        className="sidebar-menu"
        onClick={() => props.onSelectSidebar("profile")}
      >
        <a>
          <i className="fas fa-user-circle"></i>
          <p>Profile</p>
        </a>
      </li>
      <li
        className="sidebar-menu"
        onClick={() => props.onSelectSidebar("orders")}
      >
        <a>
          <i className="fas fa-shopping-bag"></i>
          <p>Orders</p>
        </a>
      </li>
      <li
        className="sidebar-menu"
        onClick={() => props.onSelectSidebar("reset")}
      >
        <a>
          <i className="fas fa-key"></i>
          <p>Reset</p>
        </a>
      </li>
      <li className="sidebar-menu">
        <a onClick={() => props.onSelectSidebar("logout")}>
          <i className="fas fa-sign-out-alt"></i>
          <p>Logout</p>
        </a>
      </li>
    </ul>
  );
};
export default DashboardSidebarNav;
