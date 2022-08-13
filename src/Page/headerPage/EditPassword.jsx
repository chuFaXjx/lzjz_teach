import { Button, Form, Input, message } from "antd";
import { editPwd } from "../../api/user";
import React from "react";

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
  //提交修改密码
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    editPwd(values);
    message.success("密码已更改请重新登录");
    // 退出登录页面跳转
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
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
