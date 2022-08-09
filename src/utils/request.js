// 封装ajax
import axios from "axios";

// http://192.168.0.253:8091/sys/user/login
//引入basurl公共变量
const REACT_APP_BASEURL = 'http://192.168.0.253:8091'
//引入element ui 库里面的弹出层
const service = axios.create({
  baseURL: REACT_APP_BASEURL,
  //请求超时时间
  timeout: 1000 * 60 * 5,
});

//添加请求拦截器 为了携带token
service.interceptors.request.use(
  function (config) {
    // console.log('请求拦截', config);
    
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
    console.log("响应拦截器", response);

    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
