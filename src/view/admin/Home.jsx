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
import { useNavigate } from "react-router";
import Style from "../../style/Admin.module.css";

//引入右侧头部部分
import HerderReg from "../../components/HerderReg";
import ContentReg from "../../components/ContentReg";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  //使用namvgettaizxhaun路由
  const navigate = useNavigate();
  // 菜单的每一项绑定点击事件
  const onClick = (e) => {
    navigate(e.key);
    // console.log("click ", e);
  };
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
            {collapsed ? (
              <img
                style={{ width: "35px" }}
                src="http://127.0.0.1:5173/src/assets/img/logo.png"
                alt="图片"
              />
            ) : (
              "教务管理系统"
            )}
          </div>
          {/* 左侧菜单 */}
          <Menu
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
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
              backgroundColor: "#fff",
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
              backgroundColor:"#fff"
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
    getItem("菜单权限管理", "menus"),
    getItem("角色管理", "roles"),
    getItem("部门管理", "depts"),
  ]),
  getItem("职工管理", "sub2", <AppstoreOutlined />, [
    getItem("教职工管理", "users"),
  ]),
  getItem("试题管理", "sub4", <SettingOutlined />, [
    getItem("试卷管理", "dlTest"),
    getItem("题库管理", "dlQuestionBank"),
    getItem("试题类型管理", "dlQuestionType"),
  ]),
  getItem("考试管理", "sub5", <SettingOutlined />, [
    getItem("考试计划", "dlExamPlan"),
    getItem("考务查询", "dlExamList"),
    getItem("我的考务", "dlExamMyList"),
  ]),
  getItem("成绩管理", "sub6", <SettingOutlined />, [
    getItem("成绩查询", "dlExamResult"),
    getItem("成绩录入", "dlExamResultInput"),
    getItem("统一录入", "dlExamResultUnifyInput"),
  ]),
  getItem("课表管理", "sub7", <SettingOutlined />, [
    getItem("排课任务", "dlArrangingCourse"),
    getItem("教师课表", "teacherTable"),
    getItem("班级课表", "classTable"),
    getItem("课间管理", "dlCourseTable"),
  ]),
  getItem("教务管理", "sub8", <SettingOutlined />, [
    getItem("Option 10", "18"),
    getItem("Option 11", "19"),
    getItem("Option 12", "20"),
    getItem("Option 10", "21"),
    getItem("Option 10", "22"),
    getItem("Option 10", "23"),
    getItem("Option 11", "24"),
    getItem("Option 12", "25"),
  ]),
  getItem("系统管理", "sub9", <SettingOutlined />, [
    getItem("Option 9", "26"),
    getItem("Option 10", "27"),
    getItem("Option 11", "28"),
    getItem("Option 12", "29"),
    getItem("Option 11", "30"),
    getItem("Option 12", "31"),
  ]),
  getItem("其他", "sub10", <SettingOutlined />, [
    getItem("Option 9", "32"),
    getItem("Option 10", "33"),
    getItem("Option 11", "34"),
  ]),
];

// 定义rootSubmenuKeys，点击当前菜单展开，其余关闭
const rootSubmenuKeys = [
  "sub1",
  "sub2",
  "sub3",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9",
  "sub10",
];

export default Admin;
