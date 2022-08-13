//试题类型管理
import React, { useEffect, useState, useRef } from "react";
import {
  QuestionTypeList,
  QuestionTypeAdd,
  QuestionTypeDel,
  QuestionTypeUpdate,
} from "../../api/QuestionAPI/QuestionType";
import {
  Table,
  Button,
  Space,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
  Pagination,
  ConfigProvider,
} from "antd";
// 引入antd中文包
import zhCN from "antd/es/locale/zh_CN";

export default function TypeManagement() {
  // 定义总条数
  const [total, setTotal] = useState(0);
  // 定义第几页
  const [page, setPage] = useState(1);
  // 定义每页多少数据
  const [limit, setLimit] = useState(10);
  //from表单数据
  const [form] = Form.useForm();
  // 进入既获取数据
  useEffect(() => {
    getTypeList(page, limit);
  }, []);
  // 获取展示数据
  async function getTypeList(page, limit, key) {
    let res = await QuestionTypeList(page, limit, key);
    setTotal(res.data.total);
    let getRes = res.data.records;
    getRes.map((item, index) => {
      item.key = item.id;
    });
    setSource(getRes);
  }
  // 修改数据
  const [dataSource, setSource] = useState([]);

  // input框
  const { Search } = Input;
  // const suffix = (
  // <AudioOutlined
  //   style={{
  //     fontSize: 16,
  //     color: "#1890ff",
  //   }}
  // />
  // );
  const onSearch = (value) => console.log(value);

  // 表格源数据
  const columns = [
    {
      title: "类型数据",
      key: "typeName",
      dataIndex: "typeName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "操作",
      key: "",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModaledit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="您确定要删除此任务吗？"
            onConfirm={(confirm) => handleDelete(record)}
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
          {/* <a>Invite {record.name}</a>
        <a>Delete</a> */}
        </Space>
      ),
    },
  ];

  //对话框 //是否打开对话框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  // const [addModelFormValue,setAddModelFormValue]=-useState()
  //表单添加数据
  const addModelFormRef = useRef();
  //对话框添加
  function showModaladd() {
    setIsModalVisibleAdd(true); //打开
  }
  // 在模态框打开的同时给表单赋值
  useEffect(() => {
    // 给表单设置默认值
    if (addModelFormRef.current) {
      addModelFormRef.current.setFieldsValue({
        typeName: "",
        remark: "",
      });
    }
  }, [isModalVisibleAdd]);
  async function onFinishAdd(values) {
    //点击提交
    await QuestionTypeAdd({
      id: "",
      remark: values.remark,
      typeName: values.typeName,
    });
    setIsModalVisibleAdd(false); //关闭
    message.success("已添加成功");
    getTypeList(page, limit);
  }
  function formModelAdd() {
    //点击取消关闭
    setIsModalVisibleAdd(false); //关闭
  }
  function handleCancelAdd() {
    //点击x关闭
    setIsModalVisibleAdd(false); //关闭
  }

  // 获取编辑模态框里的form
  const editModelFormRef = useRef();
  // 编辑模态框form里的默认值
  const [editModelFormValue, setEditModelFormValue] = useState({});
  // 给表单赋值
  const [record, setRecord] = useState({});
  //对话框编辑
  function showModaledit(record) {
    setRecord(record);
    setIsModalVisible(true); //打开
  }
  // 在模态框打开的同时给表单赋值
  useEffect(() => {
    // 给表单设置默认值
    if (editModelFormRef.current) {
      editModelFormRef.current.setFieldsValue({
        typeName: record.typeName,
        remark: record.remark,
      });
    }
  }, [isModalVisible]);
  //编辑成功
  const onFinish = async (values) => {
    console.log("Success:", values);
    await QuestionTypeUpdate({
      id: record.id,
      remark: values.remark,
      typeName: values.typeName,
    });
    setIsModalVisible(false); //关闭
    message.success("已成功编辑");
    getTypeList(page, limit);
  };
  //取消模态框
  function formModel() {
    setIsModalVisible(false); //关闭模态框
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //删除时气泡确认框
  async function handleDelete(record) {
    //表格内部删除
    await QuestionTypeDel([record.id]);
    getTypeList(page, limit);
    message.success("已成功删除");
  }
  async function confirm() {
    //表格头部删除
    await QuestionTypeDel(selectedRowKeys);
    getTypeList(page, limit);
    message.success("已成功删除");
  }
  const cancel = (e) => {
    //取消删除
    console.log(e);
    message.error("已取消删除");
  };

  //Table表格选择框被选中的数组
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  // 配置table表格的选择框(位置必须在下边)
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 分页器
  const onChangePag = (page, limit) => {
    console.log("Page: ", page, limit);
    setPage(page);
    setLimit(limit);
    getTypeList(page, limit);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* table左侧 */}
        <div>
          <Button
            type="primary"
            onClick={showModaladd}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            添加
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
        </div>
        {/* table右侧input */}
        <div>
          <Space direction="vertical" style={{ marginBottom: 10 }}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Space>
        </div>
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          rowSelection={rowSelection}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
        <Pagination
          style={{ textAlign: "right" }}
          total={total}
          defaultCurrent={1}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage
          onChange={onChangePag}
        />
      </ConfigProvider>
      {/* 模态框编辑 */}
      <Modal
        title="编辑"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          [] // 设置footer为空，去掉 取消 确定默认按钮
        }
        width={400}
      >
        <Form
          ref={editModelFormRef}
          layout=""
          name="form_in_modal"
          form={form}
          onFinish={onFinish} //提交
          initialValues={editModelFormValue}
        >
          <Form.Item name="typeName" label="类型">
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input type="textarea" style={{ width: 280 }} />
          </Form.Item>
          <div style={{ display: "flex", marginLeft: 170 }}>
            <Form.Item onClick={formModel}>
              <Button>取消</Button>
            </Form.Item>
            <Form.Item style={{ paddingLeft: 10 }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
      {/* 模态框添加 */}
      <Modal
        title="添加"
        visible={isModalVisibleAdd}
        onCancel={handleCancelAdd}
        footer={
          [] // 设置footer为空，去掉 取消 确定默认按钮
        }
        width={400}
      >
        <Form
          ref={addModelFormRef}
          layout="添加"
          name="form_in_modal"
          form={form}
          onFinish={onFinishAdd} //提交
          // initialValues={addModelFormValue}
        >
          <Form.Item name="typeName" label="类型">
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input type="textarea" style={{ width: 280 }} />
          </Form.Item>
          <div style={{ display: "flex", marginLeft: 170 }}>
            <Form.Item onClick={formModelAdd}>
              <Button>取消</Button>
            </Form.Item>
            <Form.Item style={{ paddingLeft: 10 }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
