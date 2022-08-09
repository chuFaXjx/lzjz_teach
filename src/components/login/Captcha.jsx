import React, { Component } from "react";

import { message } from "antd";

export default class Captcha extends Component {
  // 验证成功之后进行的操作
  success = () => {
    message.success("验证成功");
  };
  render() {
    return <div>验证码</div>;
  }
}
