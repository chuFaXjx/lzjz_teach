import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { BrowserRouter, Route, Swith, Router } from "react-router-dom";
// 引入antd样式
import "antd/dist/antd.css";
import "./index.css";

// 将App组件标签渲染到index页面上的div上
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
