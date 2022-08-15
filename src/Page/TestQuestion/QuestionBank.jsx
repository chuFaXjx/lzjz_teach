//题库管理
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useEffect, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
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
  Pagination,
} from "antd";
import {
  QuestionBankList,
  QuestionBankDel,
  QuestionBankInputLinkage,
  QuestionBankInput,
} from "../../api/QuestionAPI/QuestionBankAPI";

const QuestionBank = (props, ref) => {
  // 定义总条数
  const [total, setTotal] = useState(0);
  // 定义第几页
  const [page, setPage] = useState(1);
  // 定义每页多少数据
  const [limit, setLimit] = useState(10);
  // 进入既获取数据
  useEffect(() => {
    getTypeList();
  }, []);

  // 获取展示数据
  async function getTypeList() {
    let res = await QuestionBankList();
    // console.log("res", res);
    let getRes = res.data.records;
    // console.log("getRes", getRes);
    getRes.map((item, index) => {
      item.key = item.id;
    });
    // console.log("ews12345", res.data.records);
    setSource(getRes);
  }
  // 修改数据
  const [dataSource, setSource] = useState([]);

  //表单事件
  async function onFinish(values) {
    //QuestionBankInput()
    // await QuestionBankList({
    //   content: values.content,
    //   gradeType: "",
    //   limit: values.limit,
    //   page: values.page,
    //   questionType: null,
    //   subjectId: "",
    // });
    console.log("Success:", values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //是否抽屉
  const [addvisible, setAddVisible] = useState(false); //添加决定是否打开抽屉
  const [editvisible, setEditVisible] = useState(false); //编辑决定是否打开抽屉
  // 编辑
  const editShowDrawer = () => {
    setEditVisible(true);
  };
  const editonClose = () => {
    setEditVisible(false);
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
          <Button type="primary" onClick={() => editShowDrawer(record)}>
            编辑
          </Button>
          <Popconfirm
            title="您确定要删除此任务吗？"
            onConfirm={() => handelDelete(record)}
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

  // 添加
  const addhandelWysiwyg = () => {
    console.log("富文本编辑器");
    setAddVisible(true);
  };
  const addonClose = () => {
    setAddVisible(false);
  };

  //删除时(气泡确认框)
  async function handelDelete(record) {
    await QuestionBankDel([record.id]);
    message.success("已成功删除");
    getTypeList();
  }
  const cancel = (e) => {
    console.log(e);
    message.error("已取消删除");
  };

  // 分页器
  const onChangePag = (page, limit) => {
    console.log("Page: ", page, limit);
    setPage(page);
    setLimit(limit);
    getTypeList(page, limit);
  };

  //---------------------------------------------------------------
  // 添加的富文本编辑器
  // addeditor 实例
  const [addeditor, setEditor] = useState(null); // JS 语法
  // 编辑器内容
  const [html, setHtml] = useState("<p>添加hello</p>");
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello world</p>");
    }, 1500);
  }, []);
  // 工具栏配置
  const toolbarConfig = {}; // JS 语法
  // 编辑器配置
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };
  // 及时销毁 addeditor ，重要！
  useEffect(() => {
    return () => {
      if (addeditor == null) return;
      addeditor.destroy();
      setEditor(null);
    };
  }, [addeditor]);
  // --------------------------------------------------------
  // 编辑的富文本编辑器------------
  const [editEditor, setEeditEditor] = useState(null); // JS 语法
  // 编辑器内容
  const [editHtml, setEditHtml] = useState("<p>编辑hello</p>");
  // 模拟 ajax 请求，异步设置 editHtml
  useEffect(() => {
    setTimeout(() => {
      setEditHtml("<p>hello world</p>");
    }, 1500);
  }, []);
  // 工具栏配置
  const toolbarConfigEdit = {}; // JS 语法
  // 编辑器配置
  const editorConfigEdit = {
    // JS 语法
    placeholder: "请输入内容...",
  };
  // 及时销毁 setEeditEditor ，重要！
  useEffect(() => {
    return () => {
      if (editEditor == null) return;
      editEditor.destroy();
      setEeditEditor(null);
    };
  }, [editEditor]);

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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: 700 }}>
        <Button
          onClick={addhandelWysiwyg}
          type="primary"
          style={{ marginBottom: 10 }}
        >
          添加
        </Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
        />
        <Pagination
          style={{ textAlign: "right" }}
          total={total}
          defaultCurrent={1}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage //只有一页时分页不显示
          onChange={onChangePag}
        />
      </div>
      {/* 添加抽屉(含富文本编辑器) */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={addonClose}
        visible={addvisible}
        width={700}
      >
        {/* 富文本编辑器 */}
        <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
          <Toolbar
            editor={addeditor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(addeditor) => setHtml(addeditor.getHtml())}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </div>
        <div style={{ marginTop: "15px" }}>{html}</div>
      </Drawer>
      {/* 编辑抽屉(含富文本编辑器) */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={editonClose}
        visible={editvisible}
        width={700}
      >
        {/* 编辑富文本编辑器上 */}
        <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
          <Toolbar
            editor={editEditor}
            defaultConfig={toolbarConfigEdit}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfigEdit}
            value={editHtml}
            onCreated={setEeditEditor}
            onChange={(editEditor) => setEditHtml(editEditor.getHtml())}
            mode="default"
            style={{ height: "350px", overflowY: "hidden" }}
          />
        </div>
        <div style={{ marginTop: "15px" }}>{editHtml}</div>
        {/* 编辑富文本编辑器下 */}
        <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
          <Toolbar
            editor={editEditor}
            defaultConfig={toolbarConfigEdit}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfigEdit}
            value={editHtml}
            onCreated={setEeditEditor}
            onChange={(editEditor) => setEditHtml(editEditor.getHtml())}
            mode="default"
            style={{ height: "350px", overflowY: "hidden" }}
          />
        </div>
        <div style={{ marginTop: "15px" }}>{editHtml}</div>
      </Drawer>
      <div></div>
    </div>
  );
};
export default QuestionBank;
