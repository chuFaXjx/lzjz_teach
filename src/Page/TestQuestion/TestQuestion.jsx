//试卷管理
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Modal,
  Form,
  message,
  ConfigProvider,
  Pagination,
} from "antd";
// 引入antd中文包
import zhCN from "antd/es/locale/zh_CN";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrinterFilled } from "@ant-design/icons";
import {
  TestQuestionList,
  TestQuestionDel,
} from "../../api/QuestionAPI/TestQuestionAPI";

// input框
const { Search } = Input;
const onSearch = (value) => console.log(value);

//组件--------------------------
export default function TestQuestion() {
  // 定义总条数
  const [total, setTotal] = useState(0);
  // 定义第几页
  const [page, setPage] = useState(1);
  // 定义每页几条数据
  const [limit, setLimit] = useState(10);
  // 进入既获取数据
  useEffect(() => {
    // 进入就获取每页几条数据及第几页
    getTypeList(page, limit);
  }, []);
  // 获取展示数据
  async function getTypeList(page, limit) {
    let res = await TestQuestionList(page, limit);
    setTotal(res.data.total); //获取总数据展示
    let getRes = res.data.records;
    getRes.map((item, index) => {
      item.key = item.id;
    });
    // console.log("ews12345", res.data.records);
    setSource(getRes);
  }
  // 修改数据
  const [dataSource, setSource] = useState([]);
  // 添加编辑页面跳转
  const navigate = useNavigate();

  //是否跳转
  const [isModalVisible, setIsModalVisible] = useState(false); //是否跳转
  const showModal = () => {
    navigate("/index/testQue");
    // setIsModalVisible(true); //打开
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 分页器
  const onChangePag = (page, limit) => {
    console.log("Page: ", page, limit);
    setPage(page);
    setLimit(limit);
    getTypeList(page, limit);
  };

  // 源数据
  const columns = [
    {
      title: "试卷编号",
      key: "code",
      dataIndex: "code",
      render: (text) => <p>{text}</p>,
      width: 100,
    },
    {
      title: "试卷名称",
      key: "testName",
      dataIndex: "testName",
      render: (text) => <p>{text}</p>,
      width: 150,
    },
    {
      title: "考试时长",
      key: "duration",
      dataIndex: "duration",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "试卷总分",
      key: "score",
      dataIndex: "score",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "私有",
      key: "self",
      dataIndex: "self",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "科目ID",
      key: "notes",
      dataIndex: "notes",
      render: (text) => <p>{text}</p>,
      width: 100,
    },
    {
      title: "适用年级",
      key: "subjectId",
      dataIndex: "subjectId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "操作",
      key: "",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={showModal}>
            编辑
          </Button>
          <Popconfirm
            title="您确定要删除此任务吗？"
            onConfirm={() => handleDelete(record)}
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

  //删除时气泡确认框
  async function handleDelete(record) {
    //表格内部删除
    console.log("record.id", record.id);
    await TestQuestionDel([record.id]);
    getTypeList(page, limit);
    message.success("已成功删除");
  }
  async function confirm() {
    await TestQuestionDel(selectedRowKeys);
    getTypeList(page, limit);
    message.success("已成功删除");
  }
  const cancel = (e) => {
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
  // 点击打印
  function handlePrint() {
    // console.log(myTable.current);
    printJS({
      printable: "TableToExport",
      type: "html",
      // header: '三味书屋',
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            type="primary"
            onClick={showModal}
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
          <Button
            icon={<PrinterFilled />}
            onClick={handlePrint}
            style={{ marginLeft: "5px", width: "61.8px", height: "32" }}
          ></Button>
        </div>
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
      {/* 数据表格 */}
      <ConfigProvider locale={zhCN}>
        <Table
          id="TableToExport"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Pagination
          style={{ textAlign: "right" }}
          total={total}
          defaultCurrent={1}
          hideOnSinglePage
          showSizeChanger
          showQuickJumper
          onChange={onChangePag}
        />
      </ConfigProvider>
      {/* 模态框 */}
      <Modal
        title="Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        width={400}
      >
        <Form layout="vertical" name="form_in_modal">
          <Form.Item name="类型" label="类型">
            <Input style={{ width: 340 }} />
          </Form.Item>
          <Form.Item name="description" label="备注">
            <Input type="textarea" style={{ width: 340 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
