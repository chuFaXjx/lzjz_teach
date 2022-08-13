//试卷管理
import request from "../../utils/request";
export  async function TestQuestionList(data) {
  let res =await  request({
    method: "post",
    url: "http://192.168.0.253:8091/dlTest/listByPage",
    data:{
      "limit":10,
      "page":1,
    },
  });
  console.log("菜单",res);
  return res;
}
// 删除
export  async function TestQuestionDel(data) {
  let res =await  request({
    method: "DELETE",
    url: "http://192.168.0.253:8091/dlTest/delete",
    data,
  });
  console.log("菜单",res);
  return res;
}