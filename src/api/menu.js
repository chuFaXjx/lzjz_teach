import request from "../utils/request";

// 权限菜单
export function menuList() {
  return request({
    method: "get",
    url: "/sys/home",
  });
}

// 所有菜单
export function allMenuList() {
  return request({
    method: "get",
    url: "/sys/permission/tree/all",
  });
}

// 添加菜单
export function addMenuItem(data) {
  return request({
    method: "post",
    url: "/sys/permission",
    data: data,
  });
}

//添加菜单列表
export function getTreeList() {
  return request({
    method: "get",
    url: "/sys/permission/tree?permissionId=12312312312",
  });
}

//根据id获取菜单
export function getMenuItem() {
  return request({
    method: "get",
    url: "/sys/permission/tree/all",
  });
}

//删除菜单
export function delMenuItem(id) {
  return request({
    method: "delete",
    url: `/sys/permission/${id}`,
  });
}

//编辑菜单
export function editMenuItem(data) {
  return request({
    method: "put",
    url: '/sys/permission',
    data,
  });
}
