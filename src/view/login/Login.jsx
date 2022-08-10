import {
  LockOutlined,
  UserOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.css";
import { login } from "../../api/login";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // 登录页面跳转
  const navigate = useNavigate();
  // loading状态
  const [isLoading, setLoading] = useState(false);
  //请求图片
  const [imgurl, setImgurl] = useState(
    "http://192.168.0.253:8091/sys/getVerify"
  );
  const updateImgurl = () => {
    setImgurl((imgurl) => (imgurl += `?${Math.random()}`));
  };
  // 登录请求
  const obj = {
    code: 0,
    data: {
      accessToken: "82104ofK92nH08Ib17H9089LQ72Zu4T5#1",
      id: "1",
      phone: "13888888888",
      username: "admin",
    },
    msg: "操作成功",
  };
  console.log(obj);
  const setload = () => {
    setLoading((isLoading) => (isLoading = true));
    setTimeout(() => {
      setLoading((isLoading) => (isLoading = false));
    }, 3000);
  };
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    // let res = await login(values);
    let res = obj;
    console.log(res);
    if (res.code === 0) {
      message.success(res.msg);
      localStorage.setItem("REACT_ADMIN_TOKEN", obj.data.accessToken);
      navigate("/index");
    } else {
      message.error(res.msg);
    }
    return;
  };

  //创建自己的icon图标
  const MyIcon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_3469015_vydueatp1pj.js", // 在 iconfont.cn 上生成
  });

  return (
    <div className="formBox">
      <div className="bgBox">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item>
            <h1 style={{ margin: 0 }}>教务管理系统</h1>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            className="captchaInp"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<MyIcon type="icon-yanzhengyanzhengma" />}
              type="captcha"
              placeholder="验证码"
              suffix={
                <img
                  className="captchaPic"
                  onClick={updateImgurl}
                  src={imgurl}
                  alt="验证码图片"
                />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              onClick={setload}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
