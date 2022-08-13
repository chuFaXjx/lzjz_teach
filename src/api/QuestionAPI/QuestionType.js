// 试题管理
import request from "../../utils/request";
export  async function QuestionTypeList(data) {
  let res =await  request({
    method: "post",
    url: "http://192.168.0.253:8091/dlQuestionType/listByPage",
    data:{
      "limit":10,
      "page":1,
    },
  });
  // console.log("菜单",res);
  return res;
}
// 添加
export  async function QuestionTypeAdd(data) {
  let res =await  request({
    method: "post",
    url: "http://192.168.0.253:8091/dlQuestionType/add",
    data,
  });
  // console.log("添加",res);
  return res;
}
// 删除
export  async function QuestionTypeDel(data) {
  let res =await  request({
    method: "DELETE",
    url: "http://192.168.0.253:8091/dlQuestionType/delete",
    data,
  });
  // console.log("添加",res);
  return res;
}
//编辑
export async function QuestionTypeUpdate(data) {
  console.log(data);
  let res =await  request({
    method: "PUT",
    url: "http://192.168.0.253:8091/dlQuestionType/update",
    data,
  });
  console.log("编辑",res);
  return res;
}
