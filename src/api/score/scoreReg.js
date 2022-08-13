// 成绩录入相关请求
import request from "../../utils/request";

// 成绩录入渲染菜单接口
export function myList(data) {
  return request({
    method: "post",
    url: "/dlExamResult/myList",
    data,
  });
}