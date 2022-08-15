import request from "../utils/request";
//部门管理
export function depList(data) {
  return request({
    method: "get",
    url: "/sys/depts",
    data,
  });
}

// 添加角色
export function addDept(data) {
  return request({
    method: "post",
    url: "/sys/role",
    data,
  });
}

//编辑角色
export function editDept(data) {
  return request({
    method: "put",
    url: "/sys/dept",
    data,
  });
}

//删除角色
export function delDept(id) {
  return request({
    method: "delete",
    url: `/sys/dept/${id}`,
  });
}

