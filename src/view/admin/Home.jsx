// 左侧菜单，右侧头部，右侧中间部分
import {
  MenuFoldOutlined, //以下切换图标
  MenuUnfoldOutlined,
  AppstoreOutlined, //以下icon菜单图标
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { SubMenu } = Menu;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Style from "../../style/Admin.module.css";
// 导入请求菜单列表数据的请求
import { menuList } from "../../api/menu";

//引入右侧头部部分
import HerderReg from "../../components/HerderReg";
import ContentReg from "../../components/ContentReg";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  // 菜单所需属性
  function getItem(label, key, type, children) {
    return {
      label,
      key,
      type,
      children,
    };
  }
  // 定义菜单数组
  let [menu, Setmenu] = useState([]);
  let items = [];
  // 页面一进来就发请求获取菜单列表（类似于生命周期钩子）
  useEffect(() => {
    lists();
  }, []);

  // 请求获取菜单列表
  async function lists() {
    const { data } = await menuList();
    Setmenu(data.menus);
    const resMenu = renderMenu(data.menus);
    resMenu.map((item) => {
      if (item.children) {
        items.push(getItem(item.lable, item.key, "", item.children));
      } else {
        items.push(getItem(item.lable, item.key, ""));
      }
      Setmenu(resMenu);
    });
  }

  // 递归渲染左侧菜单
  function renderMenu(data) {
    const res = data.map((item) => {
      const listObj = {
        label: item.title,
        key: item.id,
        type: item.type,
        url: item.url,
      };
      if (item.children && item.children.length) {
        listObj.children = renderMenu(item.children);
      } else if (item.url !== "") {
        listObj.key = item.url;
      }
      return listObj;
    });
    return res;
  }
  //使用namvgettaizxhaun路由
  const navigate = useNavigate();
  // 菜单的每一项绑定点击事件，进行路由跳转
  const onClick = (e) => {
    navigate(e.key);
  };
  // 左侧菜单的折叠关闭
  const [collapsed, setCollapsed] = useState(false);
  // 获取当前菜单点击只展开当前菜单
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
            items={menu}
          />
          {/* {list.map((item) => {
              if (item.children && item.children.length) {
                return (
                  <SubMenu key={item.id} title={item.title}>
                    {item.children.map((node) => {
                      return <Menu.Item key={node.url}>{node.title}</Menu.Item>;
                    })}
                  </SubMenu>
                );
              } else {
                return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
              }
            })} */}
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
