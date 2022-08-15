import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch, Drawer, Tree, Spin, message } from "antd";
import React, { useState, useEffect } from "react";
//编辑添加api
import { addDept, editDept } from "../../api/deps";
import { Treemap } from "@antv/g2plot";
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
  //请求树形数据默认选项
  useEffect(() => {
    setTreeData(props.editFormData);
  }, []);

  //表单数据
  const [formData, SetFormData] = useState({});
  //表单回显初始数据
  useEffect(() => {
    form.setFieldsValue(props.editFormData);
  }, []);
  //子级抽屉
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  //保存表单数据
  const onFinish = (values) => {
    SetFormData((formData) => {
      return {
        ...formData,
        ...{
          managerName: values.managerName || "",
          name: values.name || "",
          status: values.status || "",
          id: props.editFormData.id || "",
          pid: props.editFormData.pid || "",
          pidName: props.editFormData.pidName || "",
          phone: values.phone,
        },
      };
    });
    console.log(formData);
  };

  //添加/编辑按钮
  const addMenuBtn = async () => {
    let res = "";
    if (!props.editFormData.id) {
      res = await addDept(formData);
    } else {
      res = await editDept(formData);
    }
    if (res.code == 0) {
      message.success(res.msg);
      props.getList();
      props.onClose();
    }
    console.log(res);
  };

  //树形控件回调
  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

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
          label="部门名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="pidName" label="所属部门">
          <div style={{ display: "flex" }}>
            <Button type="primary" ghost onClick={showChildrenDrawer}>
              {!formData.pidName ? "请选择所属部门" : formData.pidName}
            </Button>
            <Drawer
              title="选择菜单"
              width={320}
              closable={false}
              onClose={onChildrenDrawerClose}
              visible={childrenDrawer}
            >
              {treeData.length > 0 && (
                <Treemap
                  switcherIcon={<DownOutlined />}
                  fieldNames={{ key: "id", title: "name" }}
                  onSelect={onSelect}
                  treeData={treeData}
                  defaultExpandAll={true} //是否自动展开父节点
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

        <Form.Item
          name="managerName"
          label="部门经理名称"
          rules={[
            {
              required: props.editFormData.managerName && true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="部门经理手机号"
          rules={[
            {
              required: props.editFormData.phone && true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item valuePropName="checked" label="状态" name="status">
          <Switch />
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
