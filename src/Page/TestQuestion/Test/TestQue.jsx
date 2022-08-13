import { Button, Form, Input, Select, Switch } from "antd";
import React from "react";

const TestQue = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{margin:'auto'}}
    >
      {/* 试卷名称 */}
      <Form.Item label="试卷名称" name="试卷名称">
        <Input style={{ width: 200 }} />
      </Form.Item>
      {/* 考试时长 */}
      <Form.Item label="考试时长" name="考试时长">
        <Input style={{ width: 200 }} />
      </Form.Item>
      {/* 试卷总分 */}
      <Form.Item label="试卷总分" name="试卷总分">
        <Input style={{ width: 200 }} />
      </Form.Item>
      {/* 适用年级 */}
      <Form.Item label="适用年级" name="适用年级">
        <Select placeholder="I'm Select" allowClear style={{ width: 200 }}>
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>
      </Form.Item>
      {/* 科目 */}
      <Form.Item label="科目" name="科目">
        <Select placeholder="I'm Select" allowClear style={{ width: 200 }}>
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
          <Option value="3">Option 3</Option>
        </Select>
      </Form.Item>
      {/* 私有 */}
      {/* <Form.Item name="私有" label="私有" valuePropName="checked">
        <Switch />
      </Form.Item> */}
      {/* 提交from */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="" htmlType="submit" style={{marginRight:15}}>
          返回
        </Button>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestQue;
