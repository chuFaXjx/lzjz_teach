import request from "../utils/request";

export async function user(data) {
  let res = await request({
    method: "get",
    url: "/sys/user",
  });
  console.log(res);
  return res;
}

export async function editUser(data) {
  let res = await request({
    method: "put",
    url: "/sys/user",
    data,
  });
  console.log(res);
  return res;
}

export async function editPwd(data) {
  let res = await request({
    method: "put",
    url: "/sys/user/pwd",
    data,
  });
  console.log(res);
  return res;
}
