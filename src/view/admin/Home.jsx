// 左侧菜单，右侧头部，右侧中间部分
import {
  MenuFoldOutlined, //以下切换图标
  MenuUnfoldOutlined,
  AppstoreOutlined, //以下icon菜单图标
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import Style from "../../style/Admin.module.css";

//引入右侧头部部分
import HerderReg from "../../components/HerderReg";
import ContentReg from "../../components/ContentReg";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  //   console.log(collapsed, setCollapsed);
  // 获取当前菜单点击只展开档前菜单
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    console.log(keys);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div>
      <Layout style={{ minHeight: 100 + "vh" }}>
        {/* 左侧菜单头部 */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className={Style.logo}
            style={{
              textAlign: "center",
              lineHeight: 64 + "px",
              fontSize: 20,
              color: "#fff",
            }}
          >
            {collapsed ? "EMS" : "教务管理系统"}
          </div>
          {/* 左侧菜单 */}
          <Menu
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            theme="dark"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          {/* 右侧头部 */}
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: "#cda8f0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* 收缩左部导航 */}
            <div style={{ paddingLeft: 10, fontSize: 18 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
            <div style={{ marginRight: 40 }}>
              <HerderReg></HerderReg>
            </div>
          </Header>
          {/* 右侧内容 */}
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <ContentReg></ContentReg>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

// 菜单所需属性
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// 定义菜单数组
const items = [
  getItem("组织管理", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),
  getItem("职工管理", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("试题管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("考试管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("成绩管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("课表管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("教务管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("系统管理", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("其他", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];
// 定义rootSubmenuKeys，点击当前菜单展开，其余关闭
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

export default Admin;
