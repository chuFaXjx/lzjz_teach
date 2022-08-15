//题库管理
import request from "../../utils/request";
export function QuestionBankList(data) {
  console.log("data", data);
  let res = request({
    method: "post",
    url: "http://192.168.0.253:8091/dlQuestionBank/listByPage",
    data: {
      limit: 10,
      page: 1,
      // "page":data.page,
    },
  });
  // console.log("菜单",res);
  return res;
}
// 删除
export async function QuestionBankDel(data) {
  let res = await request({
    method: "DELETE",
    url: "http://192.168.0.253:8091/dlQuestionBank/delete",
    data,
  });
  // console.log("菜单",res);
  return res;
}
// input联动
export async function QuestionBankInputLinkage(data) {
  let res = await request({
    //grade: "1612"
    method: "post",
    url: "http://192.168.0.253:8091/dlGrade/listByPage",
    data: {
      limit: 10,
      page: 1,
    },
  });
  // console.log("菜单",res);
  return res;
}
// input
export async function QuestionBankInput(data) {
  let res = await request({
    method: "POST",
    url: "http://192.168.0.253:8091/dlQuestionBank/listByPage",
    data,
  });
  // console.log("菜单",res);
  return res;
}
