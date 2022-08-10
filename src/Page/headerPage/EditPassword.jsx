import { Button, Form, Input, Select } from "antd";
import { editPwd } from "../../api/user";
import React, { useState } from "react";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EditPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    editPwd(values)
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      {/* 原密码密码 */}
      <Form.Item
        name="oldPwd"
        label="原密码"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      {/* 新密码 */}
      <Form.Item
        name="newPwd"
        label="新密码"
        rules={[
          {
            required: true,
            message: "请输入新密码!!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      {/* 确认密码 */}
      <Form.Item
        name="rePass"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请确认新密码!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPwd") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("您输入的两个密码不匹配！"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPassword;
