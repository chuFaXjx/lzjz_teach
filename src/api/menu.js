import request from "../utils/request";

export function menuList() {
  return request({
    method: "get",
    url: "/sys/home",
  });
}
