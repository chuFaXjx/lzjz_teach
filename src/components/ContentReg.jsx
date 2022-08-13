import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { BackTop } from "antd";

export default class ContentReg extends Component {
  render() {
    return (
      <div>
        <Outlet />
        <BackTop />
      </div>
    );
  }
}
