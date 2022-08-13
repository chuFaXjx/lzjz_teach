import React, { Component } from "react";
import ReactDOM from "react-dom";
import routes from "./router";
import { Outlet, useRoutes } from "react-router-dom";

function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  // console.log(element);
  return (
    <div>
      {element}
      <Outlet />
    </div>
  );
}

export default App;
