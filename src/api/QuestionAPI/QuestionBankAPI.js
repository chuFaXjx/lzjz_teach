//题库管理
import request from "../../utils/request";
export  async function QuestionBankList(data) {
  let res =await  request({
    method: "post",
    url: "http://192.168.0.253:8091/dlQuestionBank/listByPage",
    data:{
      "limit":10,
      "page":1,
    },
  });
  // console.log("菜单",res);
  return res;
}