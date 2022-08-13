// 成绩管理相关请求
import request from "../../utils/request";

// 考试计划渲染菜单接口
export function studentList(data) {
  return request({
    method: "post",
    url: "/dlStudent/listByPage",
    data,
  });
}
export function examPlanList(data) {
  return request({
    method: "post",
    url: "/dlExamPlan/listByPage",
    data,
  });
}export function classList(data) {
  return request({
    method: "post",
    url: "/dlExamResult/classList",
    data,
  });
}
