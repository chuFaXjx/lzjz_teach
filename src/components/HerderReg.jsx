import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  SyncOutlined, //刷新图标
} from "@ant-design/icons";
import { Avatar, Image, Dropdown, Menu, Space, Tooltip, Card } from "antd";
import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import ContentReg from "./ContentReg";

// admin下啦菜单
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
  const [switchCollapse, setCollapsed] = useState(true);
  const handle = useFullScreenHandle();
  // 页面刷新事件
  function refreshPage() {
    // Windows.location.reload()
    window.opener.location.reload();
    // this.forceUpdate();
  }
  // console.log("1", handle, switchCollapse, setCollapsed);
  return (
    <div style={{ display: "flex" }}>
      {/* 刷新页面部分 */}
      <div style={{ marginRight: 10, fontSize: 16 }}>
        <SyncOutlined onClick={refreshPage} />
      </div>
      {/* 全屏放大缩小部分 */}
      <div style={{ marginRight: 10, fontSize: 16 }}>
        <FullScreen
          handle={handle}
          onChange={setCollapsed}
          style={{ background: "#ffffff" }}
        >
          <Tooltip title="全屏">
            <FullscreenOutlined
              onClick={() => {
                // 点击设置full为true，接着调用handle的enter方法，进入全屏模式
                setCollapsed(true);
                handle.enter();
              }}
            />
            {/* <APPS></APPS> */}
          </Tooltip>
          <Tooltip title="退出全屏">
            <FullscreenExitOutlined
              onClick={() => {
                // 点击设置full为true，接着调用handle的enter方法，进入全屏模式
                setCollapsed(false);
                handle.exit();
              }}
            />
          </Tooltip>
          {/* <div>
              <ContentReg />
          </div> */}
        </FullScreen>
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
              {/* admin */}
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default HerderReg;
