import request from "../../utils/request";

// 排课任务分页数据
export function listByPage(data) {
  return request({
    method: "post",
    url: "/dlArrangingCourse/listByPage",
    data,
  });
}
// 排课任务删除菜单中的一项
export function deleteItem(data) {
  return request({
    method: "DELETE",
    url: "/dlArrangingCourse/delete",
    data,
  });
}