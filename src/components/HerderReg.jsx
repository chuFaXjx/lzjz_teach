import {
  UserOutlined,
  LogoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  SyncOutlined, //刷新图标
} from "@ant-design/icons";
import { Avatar, Image, Dropdown, Menu, Space, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { initFullScreen, enterFullScreen, exitFullScreen } from "../utils/full"; //全屏


// admin下拉菜单
const menu = (
  <Menu
    items={[
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            个人中心
          </a>
        ),
        key: "0",
        icon: <UserOutlined />,
      },
      {
        type: "divider",
      },
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            退出登录
          </a>
        ),
        key: "1",
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const HerderReg = () => {
  // 全屏事件
  //定义一个变量，是否全屏
  const [isFullScreen, setIsFullScreen] = useState(false);
  //监听是否全屏
  const screenChange = (isFull) => {
    console.log("是否全屏", isFull);
    setIsFullScreen(isFull);
  };
  useEffect(() => {
    //初始化
    initFullScreen(screenChange);
  });
  const handleFullScreen = () => {
    //全屏事件点击
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  // 页面刷新事件
  function refreshPage() {
    location.reload()
  }
  // console.log("1", handle, switchCollapse, setCollapsed);
  return (
    <div style={{ display: "flex" }}>
      {/* 刷新页面部分 */}
      <div style={{ marginRight: 10, fontSize: 16 }}>
        <SyncOutlined onClick={refreshPage} />
      </div>
      {/* 全屏放大缩小部分 */}
      <div onClick={handleFullScreen} style={{ marginRight: 10, fontSize: 16 }}>
        <Tooltip title={isFullScreen ? "退出全屏" : "打开全屏"}>
          {!isFullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
        </Tooltip>
      </div>
      {/* admin头像部分 */}
      <div>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ fontSize: 16 }}>
              <Avatar
                src={
                  <Image
                    src="https://joeschmoe.io/api/v1/random"
                    style={{
                      width: 32,
                    }}
                  />
                }
              />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default HerderReg;
