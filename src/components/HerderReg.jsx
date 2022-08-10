import {
  ExclamationCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  EditOutlined,
  SyncOutlined, //刷新图标
} from "@ant-design/icons";
import {
  Avatar,
  Image,
  Dropdown,
  Menu,
  Space,
  Tooltip,
  message,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
 //全屏
import { initFullScreen, enterFullScreen, exitFullScreen } from "../utils/full";

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
import { useNavigate } from "react-router-dom";
const HerderReg = () => {
  //编程式跳转
  const navigate = useNavigate();
  // admin下拉菜单
  const handleMenuClick = (e) => {
    if (e.key == 0) {
      navigate("user");
    } else if (e.key == 2) {
      console.log("退出登录");
      const confirm = () => {
        Modal.confirm({
          title: "提示",
          icon: <ExclamationCircleOutlined />,
          content: "确认退出登录？",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            message.success("退出登录");
            localStorage.removeItem("REACT_ADMIN_TOKEN");
            // 退出登录页面跳转
            navigate("/login");
          },
        });
      };
      confirm();
    } else {
      navigate("editpassword");
      message.success("跟改密码");
    }
  };
  //下拉菜单配置项
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "个人中心",
          key: "0",
          icon: <UserOutlined />,
        },
        {
          type: "divider",
        },
        {
          label: "更改密码",
          key: "1",
          icon: <EditOutlined />,
        },
        {
          type: "divider",
        },
        {
          label: "退出登录",
          key: "2",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );
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
    location.reload();
  }
  return (
    <div style={{ display: "flex",width:"150px",justifyContent:"space-between"}}>
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
                    alt="头像"
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
