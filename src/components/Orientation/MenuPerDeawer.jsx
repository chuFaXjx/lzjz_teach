import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Switch,
  Radio,
  Drawer,
  Tree,
  Spin,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { addMenuItem, getTreeList, editMenuItem } from "../../api/menu";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const App = (props) => {
  console.log("props:::", props);
  let type = null;
  type = props.editFormData.type;

  //创建表单实例对象
  const [form] = Form.useForm();
  //树形数据
  const [treeData, setTreeData] = useState([]);
  let getTreeData = async () => {
    let res = await getTreeList();
    setTreeData(res.data);
  };
  //切换单选框 单选框change事件
  const [isShow, setIsShow] = useState({
    URLIsShow: "none",
    targetIsShow: "none",
    iconIsShow: "block",
    sqbsIsShow: "none",
  });
  useEffect(() => {
    switch (type) {
      case 1:
        setIsShow({
          URLIsShow: "none",
          targetIsShow: "none",
          iconIsShow: "block",
          sqbsIsShow: "none",
        });
        break;
      case 2:
        setIsShow({
          URLIsShow: "block",
          targetIsShow: "block",
          iconIsShow: "none",
          sqbsIsShow: "none",
        });
        break;
      case 3:
        setIsShow({
          URLIsShow: "block",
          targetIsShow: "none",
          iconIsShow: "none",
          sqbsIsShow: "block",
        });
        break;

      default:
        break;
    }
  }, [props]);

  // type切换
  const onChange = (e) => {
    type = e.target.value;
    switch (type) {
      case 1:
        setIsShow({
          URLIsShow: "none",
          targetIsShow: "none",
          iconIsShow: "block",
          sqbsIsShow: "none",
        });
        break;
      case 2:
        setIsShow({
          URLIsShow: "block",
          targetIsShow: "block",
          iconIsShow: "none",
          sqbsIsShow: "none",
        });
        break;
      case 3:
        setIsShow({
          URLIsShow: "block",
          targetIsShow: "none",
          iconIsShow: "none",
          sqbsIsShow: "block",
        });
        break;

      default:
        break;
    }
  };
  //表单数据
  const [formData, SetFormData] = useState({});

  //请求表单初始数据
  useEffect(() => {
    props.editFormData.name = props.editFormData.title;
    props.editFormData.status = 1;
    SetFormData({
      pidName: props.editFormData.pidName,
      pid: props.editFormData.pid,
      id: props.editFormData.id,
    });
    //表单回显初始数据
    form.setFieldsValue(props.editFormData);
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
          icon: values.icon || "",
          name: values.name || "",
          orderNum: values.orderNum || "",
          perms: values.perms || "",
          status: values.status || "",
          target: values.target || "",
          type: values.type || "",
          url: values.url || "",
        },
      };
    });
    console.log(formData);
  };

  //添加按钮
  const addMenuBtn = async () => {
    let res = "";
    if (!props.editFormData.id) {
      console.log(11111111111);
      res = await addMenuItem(formData);
    } else {
      console.log(2222222);
      res = await editMenuItem(formData);
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
    SetFormData((formData) => {
      return {
        ...formData,
        ...{
          pidName: info.node.title,
          pid: selectedKeys[0],
        },
      };
    });
  };

  console.log("@@@formData：", formData);

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name="type" label="类型">
          <Radio.Group onChange={onChange}>
            <Radio value={1}>目录</Radio>
            <Radio value={2}>菜单</Radio>
            <Radio value={3}>按钮</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="name"
          label="菜单名称"
          placeholder="请输入菜单名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="pidName" label="所属菜单">
          <div style={{ display: "flex" }}>
            <Button type="primary" ghost onClick={showChildrenDrawer}>
              {!formData.pidName ? "点击选择所属目录" : formData.pidName}
            </Button>
            <Drawer
              title="选择菜单"
              width={320}
              closable={false}
              onClose={onChildrenDrawerClose}
              visible={childrenDrawer}
            >
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={["0"]}
                fieldNames={{ key: "id" }}
                onSelect={onSelect}
                treeData={treeData}
                defaultExpandAll={true}
              />
              <Spin
                size="large"
                spinning={treeData.length == 0 ? true : false}
              />
              <Button style={{ position:"absolute",right:"30px",top:"350px" }} type="primary" onClick={onChildrenDrawerClose}>
                确认
              </Button>
            </Drawer>
          </div>
        </Form.Item>

        <Form.Item
          name="url"
          label="接口 URL"
          style={{ display: isShow.URLIsShow }}
          rules={[
            {
              required: isShow.URLIsShow == "block" ? true : false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="target"
          label="target"
          style={{ display: isShow.targetIsShow }}
          rules={[
            {
              required: isShow.targetIsShow == "block" ? true : false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="perms"
          label="授权标识"
          style={{ display: isShow.sqbsIsShow }}
          rules={[
            {
              required: isShow.sqbsIsShow == "block" ? true : false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="icon"
          label="图标"
          style={{ display: isShow.iconIsShow }}
          rules={[
            {
              required: isShow.iconIsShow == "block" ? true : false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="orderNum"
          label="排序码"
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

export default App;
