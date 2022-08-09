import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Home from "./content/HomePage";

export default class ContentReg extends Component {
  render() {
    return (
      <div>
        <Outlet />
        <Home></Home>
      </div>
    );
  }
}
