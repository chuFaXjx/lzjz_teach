import request from "../utils/request";

// http://192.168.0.253:8091/sys/user/login
export async function login(data) {
  let res = await request({
    method: "post",
    url: "/sys/user/login",
    data,
  });
  console.log(res);
  return res;
}
