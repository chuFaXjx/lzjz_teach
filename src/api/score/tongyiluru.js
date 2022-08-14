// 统一录入
import request, { service2 } from "../../utils/request";

// 统一录入渲染菜单接口
export function inputList(data) {
  return request({
    method: "post",
    url: "/dlExamPlan/inputList",
    data,
  });
}
