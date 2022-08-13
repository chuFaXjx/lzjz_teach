// 考务查询相关请求
import request from "../../utils/request";

// 考试计划渲染菜单接口
export function getExamSeach(data) {
  return request({
    method: "post",
    url: "/dlExamList/listByPage",
    data,
  });
}