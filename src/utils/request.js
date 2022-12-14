// 封装ajax
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// 导入进度条插件
import useNProgress from "../hooks/useNprogress";
const NProgress = useNProgress();

// http://192.168.0.253:8091/sys/user/login
//引入basurl公共变量
const REACT_APP_BASEURL = "http://192.168.0.253:8091";
const service = axios.create({
  baseURL: REACT_APP_BASEURL,
  //请求超时时间
  timeout: 1000 * 60 * 5,
});

//添加请求拦截器 为了携带token
service.interceptors.request.use(
  function (config) {
    // console.log("请求拦截", config);
    // 开启进度条
    NProgress.start();
    if (!config.url.includes("/login")) {
      // config.headers["AUTHORIZATION"] = "Bearer " + localStorage.getItem('token')
      config.headers.authorization = localStorage.getItem("REACT_ADMIN_TOKEN");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 关闭进度条
    NProgress.done();
    // console.log("响应拦截器", response);
    if (response.data.code !== 0) {
      message.error(response.data.msg);
      if (response.data.code == 403) {
        // 跳转到对应的页面
        const navigate = useNavigate();
        navigate("/login");
      }
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const service2 = axios.create({
  baseURL: "http://localhost:3000",
  //请求超时时间
  timeout: 1000 * 60 * 5,
});

export default service;
