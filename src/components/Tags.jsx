import { Tag } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Tags = (props) => {
  const navigate = useNavigate();
  //路由当前路径
  let path = props.path;
  let name = props.breadcrumbList[1];

  //tags数组
  let [tags, setTags] = useState([
    {
      name: "菜单权限管理",
      path: "/index/menus",
    },
  ]);
  // 判断是否添加过tags
  const hasTag = tags.find((item) => item.path == path);
  //添加tag
  if (!hasTag) {
    setTags([
      ...tags,
      {
        name: name || localStorage.getItem("TAG_NAME"),
        path: path,
      },
    ]);
  }
  // console.log(tags);
  //路由跳转
  const To = (path) => {
    navigate(path);
  };
  //tags删除
  const log = (item) => {
    console.log(item);
    setTags(tags.filter((it) => it.name !== item.name));
  };

  return (
    <>
      {tags.map((item, index) => (
        <Tag
          closable
          onClick={() => To(item.path)}
          onClose={() => log(item)}
          key={item.path}
          color={item.path == path ? "blue" : ""}
        >
          {item.name}
        </Tag>
      ))}
    </>
  );
};

export default Tags;
