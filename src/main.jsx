import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// 引入全局注入表单校验
import { ConfigProvider } from "antd";
// 引入antd样式
import "antd/dist/antd.css";
//全局css样式
import "./index.css";
const validateMessages = {
  required: "${label}是必填的!",
  types: {
    email: "请输入正确的${label}地址",
  },
};
// 将App组件标签渲染到index页面上的div上
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ConfigProvider  form={{ validateMessages }}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

