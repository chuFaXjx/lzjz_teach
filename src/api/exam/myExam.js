// 我的考务相关请求
import request from "../../utils/request";

// 考试计划渲染菜单接口
export function getMyExam(data) {
  return request({
    method: "post",
    url: "/dlExamList/myList",
    data,
  });
}