//题库管理
import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Popconfirm,
  Input,
  Form,
  Select,
  Table,
  Space,
  message,
} from "antd";
import { QuestionBankList } from "../../api/QuestionAPI/QuestionBankAPI";
// import { Editor } from 'react-draft-wysiwyg';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//富文本编辑器
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const QuestionBank = (_, index) => {
  // 进入既获取数据
  useEffect(() => {
    getTypeList();
  }, []);

  // const [editorState, setEditorState] = useState({});

  // 获取展示数据
  async function getTypeList() {
    let res = await QuestionBankList();
    console.log("res", res);
    let getRes = res.data.records;
    console.log("getRes", getRes);
    getRes.map((item, index) => {
      item.key = item.id;
    });
    // console.log("ews12345", res.data.records);
    setSource(getRes);
  }
  // 修改数据
  const [dataSource, setSource] = useState([]);

  //表单事件
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //删除时气泡确认框
  const confirm = (e) => {
    console.log(e);
    message.success("已成功删除");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("已取消删除");
  };
  //是否抽屉
  const [visible, setVisible] = useState(false); //决定是否打开抽屉
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // 添加
  const handelWysiwyg = () => {
    console.log("富文本编辑器");
    setVisible(true);
  };
  // 数据源
  const columns = [
    {
      title: "试题",
      dataIndex: "content",
      key: "key",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "操作",
      key: "",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={showDrawer}>
            编辑
          </Button>
          <Popconfirm
            title="您确定要删除此任务吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{ background: "#FF6C34", border: "none" }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // function onEditorStateChange(e) {
  //   console.log(e);
  // }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 280 }}
        >
          {/*  */}
          <Form.Item label="" name="">
            <Input style={{ width: 200 }} />
          </Form.Item>
          {/* 年级 */}
          <Form.Item label="年级" name="年级">
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
          <Form.Item
          // wrapperCol={{
          //   // offset: 8,
          //   span: 16,
          // }}
          >
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: 700 }}>
        <Button
          onClick={handelWysiwyg}
          type="primary"
          style={{ marginBottom: 10 }}
        >
          添加
        </Button>
        <Table columns={columns} dataSource={dataSource} bordered />
      </div>
      {/* 抽屉 */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={700}
      >
        <p>Some contents...</p>
        {/* 富文本编辑器 */}
        {/* <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        ; */}
      </Drawer>
    </div>
  );
};
export default QuestionBank;
