// 考试相关请求
import request from "../../utils/request";

// 考试计划渲染菜单接口
export function getExamPlan(data) {
  return request({
    method: "post",
    url: "/dlExamPlan/listByPage",
    data,
  });
}

// 考试计划删除当前项接口
export function deleteExamPlan(data) {
  return request({
    method: "DELETE",
    url: `/dlExamPlan/delete`,
    data,
  });
}

// 考试计划编辑接口  
// 参考年级选择接口 {type: "1"}
export function changeClassType(data) {
  return request({
    method: "POST",
    url: `/dlGrade/getGradeListByClassType`,
    data,
  });
}
// 点击下一步后 /dlExamPlan/update
// {
//   "id": "1499550771403583489",
//   "timeStart": "2022-08-12 00:00:00 ",
//   "timeEnd": " 2022-08-13 00:00:00",
//   "termName": "2020~2021学年度第二学期",
//   "name": "1",
//   "time": "2022-08-12 00:00:00 ~ 2022-08-13 00:00:00",
//   "termId": "1360518975966326786",
//   "invigilatorNum": "2",
//   "classType": "1",
//   "gradeId": "1335469590391369729",
//   "examType": "1",
//   "examDesc": "123456"
// }
export function update(data) {
  return request({
    method: "PUT",
    url: `/dlExamPlan/update`,
    data,
  });
}

//点击下一步后 /dlExamPlan/classVoListByGradeId
// {
//   "gradeId": "1335469590391369729",
//   "id": "1499550771403583489"
// }
export function classVoListByGradeId(data) {
  return request({
    method: "POST",
    url: `/dlExamPlan/classVoListByGradeId`,
    data,
  });
}

// 点击下一步后 /dlExamPlan/courseVoListByGradeId
// {
//   "gradeId": "1335469590391369729",
//   "id": "1499550771403583489"
// }
export function courseVoListByGradeId(data) {
  return request({
    method: "POST",
    url: `/dlExamPlan/classVoListByGradeId`,
    data,
  });
}