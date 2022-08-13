import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch, Drawer, Tree, Spin, message } from "antd";
import React, { useState, useEffect, useRef } from "react";
//树形权限
import { getMenuItem } from "../../api/menu";
//编辑添加api
import { addRole, editRole, getARole } from "../../api/role";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const RoleMainForm = (props) => {
  console.log("props:::", props);

  //创建表单实例对象
  const [form] = Form.useForm();
  //树形数据
  const [treeData, setTreeData] = useState([]);
  let [roleResID, setRoleResID] = useState([]);
  let IDarr = [];
  let getRoleID = async () => {
    let roleRes = await getARole(props.editFormData.id);
    // 递归取出权限数组
    function getID(json) {
      json.forEach(function (item) {
        //if用来判断外层，else if用来判断里层，调用递归函数的有2个判断条件在“有goods属性并且不为空”情况下才调用
        if (item.checked) {
          IDarr.push(item.id);
        } else if (item.children && item.children.length > 0) {
          getID(item.children); //递归
        }
      });
      return IDarr; //全部遍历完之后返回对象o
    }
    getID(roleRes.data.permissionRespNodes);

    console.log(IDarr);
    setRoleResID(IDarr);
  };
  let getTreeData = async () => {
    let res = await getMenuItem();
    //设置树形数据
    setTreeData(res.data);
  };

  //表单数据
  const [formData, SetFormData] = useState({});
  //请求树形数据默认选项
  useEffect(() => {
    //表单回显初始数据
    form.setFieldsValue(props.editFormData);
    getRoleID();
  }, []);
  //请求表单初始数据
  useEffect(() => {
    getTreeData();
  }, []);

  //子级抽屉
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  //表单提交
  const onFinish = (values) => {
    SetFormData((formData) => {
      return {
        ...formData,
        ...{
          description: values.description || "",
          name: values.name || "",
          status: values.status || "",
        },
      };
    });
    console.log(formData);
  };

  //添加按钮
  const addMenuBtn = async () => {
    let res = "";
    if (!props.editFormData.id) {
      res = await addRole(formData);
    } else {
      res = await editRole(formData);
    }
    if (res.code == 0) {
      message.success(res.msg);
      props.getList();
      props.onClose();
    }
    console.log(res);
  };

  //树形控件回调
  const onSelect = (selectedKeys, info) => {
    console.log(selectedKeys, info);
  };
  const onCheck = (checkedKeys) => {
    console.log("onCheck", checkedKeys);
  };
  console.log("@@@formData：", formData);

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={formData}
        form={form}
      >
        <Form.Item
          name="name"
          label="角色名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="备注"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item valuePropName="checked" label="状态" name="status">
          <Switch />
        </Form.Item>
        <Form.Item name="pidName" label="请选择权限">
          <div style={{ display: "flex" }}>
            <Button type="primary" ghost onClick={showChildrenDrawer}>
              {!formData.pidName ? "请选择权限" : formData.pidName}
            </Button>
            <Drawer
              title="选择菜单"
              width={320}
              closable={false}
              onClose={onChildrenDrawerClose}
              visible={childrenDrawer}
            >
              {treeData.length > 0 && (
                <Tree
                  checkable
                  switcherIcon={<DownOutlined />}
                  fieldNames={{ key: "id" }}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  treeData={treeData}
                  checkStrictly={roleResID.length == 0 ? false : true}
                  defaultExpandAll={true} //是否自动展开父节点
                  defaultCheckedKeys={roleResID}
                  defaultSelectedKeys={roleResID}
                />
              )}
              <Spin
                size="large"
                spinning={treeData.length == 0 ? true : false}
              />
              <Button
                style={{ position: "absolute", right: "30px", top: "350px" }}
                type="primary"
                onClick={onChildrenDrawerClose}
              >
                确认
              </Button>
            </Drawer>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button
            ghost
            type="primary"
            style={{ marginLeft: "30px" }}
            onClick={addMenuBtn}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
      ;
    </>
  );
};

export default RoleMainForm;
