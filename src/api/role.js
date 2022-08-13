import request from "../utils/request";

// 分页/条件查询所有角色
export function roleList(data) {
  return request({
    method: "post",
    url: "/sys/roles",
    data,
  });
}

// 添加角色
export function addRole(data) {
  return request({
    method: "post",
    url: "/sys/role",
    data,
  });
}

//编辑角色
export function editRole(data) {
  return request({
    method: "put",
    url: "/sys/role",
    data,
  });
}

//删除角色
export function delRole(id) {
  return request({
    method: "delete",
    url: `/sys/role/${id}`,
  });
}

//获取一条角色信息
export function getARole(id) {
    return request({
      method: "get",
      url: `/sys/role/${id}`,
    });
  }
