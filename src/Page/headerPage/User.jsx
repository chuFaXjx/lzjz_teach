import React, { useState, useEffect } from "react";
import { user, editUser } from "../../api/user";
import { Button, Form, Input, Switch, Radio } from "antd";
import Style from "../../style/headerHomepage/user.module.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function User() {
  const [formData, SetFormData] = useState({
    email: "xxxxxx@163.com",
    id: "1",
    phone: "13888888888",
    realName: "爱糖宝",
    sex: "2",
    status: 1,
    username: "admin",
  });
  async function userForm() {
    let { data } = await user();
    let obj = {
      email: data.email,
      id: data.id,
      phone: data.phone,
      realName: data.realName,
      sex: data.sex,
      status: data.status,
      username: data.username,
    };
    SetFormData(obj);
  }

  useEffect(() => {
    userForm();
  }, []);

  console.log("@@@@@", formData);
  // 编辑提交
  const onFinish = (values) => {
    console.log(values);
    values.id = 1;
    editUser(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={formData}
    >
      <Form.Item
        name="username"
        label="账号"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="realName"
        label="真实姓名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input maxLength={11} />
      </Form.Item>

      <Form.Item valuePropName="checked" label="状态" name="status">
        <Switch />
      </Form.Item>

      <Form.Item name="sex" label="单选框">
        <Radio.Group>
          <Radio value="1">男</Radio>
          <Radio value="2">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
