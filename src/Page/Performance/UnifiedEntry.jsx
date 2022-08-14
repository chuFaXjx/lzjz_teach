//统一录入
import React, { useState, useEffect } from "react";
// 引入antd中文包
import zhCN from "antd/es/locale/zh_CN";
import {
  Table,
  Button,
  Input,
  Space,
  Pagination,
  ConfigProvider,
  Modal,
} from "antd";
// 导入相关请求
import { inputList } from "../../api/score/tongyiluru";

export default function ExaminationPlan() {
  // 头部搜索框相关
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  //Table表格选择框被选中的数组
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys, selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  // 配置table表格的选择框(位置必须在下边)
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 表格表头的数据
  const columns = [
    {
      title: "考试标题",
      dataIndex: "name",
      key: "name",
      sorter: () => {},
    },
    {
      title: "年级",
      dataIndex: "gradeId",
      key: "gradeId",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      render: (_, record) => (
        <div>
          <Button type="primary" size="small" onClick={showModal}>
            成绩录入
          </Button>
        </div>
      ),
    },
  ];
  // 表单内容区域数据的数组
  const [tableData, SetTableData] = useState([]);
  // 分页器数据总条数
  const [total, Settotal] = useState("");
  // 分页器当前页、每页几条
  const [page, Setpage] = useState(1);
  const [limit, Setlimit] = useState(10);
  // 函数组件生命周期请求
  useEffect(() => {
    scorelist(page, limit);
  }, []);
  // 请求表单数据
  async function scorelist(page, limit) {
    const { data } = await inputList({ page: page, limit: limit });
    Settotal(data.total);
    console.log(data);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 更新表单内容区域数据
    SetTableData(data.records);
  }
  // 分页器
  const onChange = (page, limit) => {
    // 更新页码和条数
    Setlimit(limit);
    Setpage(page);
    // 重新渲染表格
    exanPlan(page, limit);
  };

  // 删除模态框的开关
  const [isOpen, setIsOpen] = useState(false);
  // 点击头部删除按钮打开删除的模态框
  function showModal() {
    setIsOpen(true);
  }
  // 删除模态框点击取消的函数
  function handleCancel() {
    setIsOpen(false);
  }
  // 删除模态框点击确定按钮的函数（删除当前被选中的菜单）
  async function handleOk() {
    await deleteExamPlan(selectedRowKeys);
    message.success("删除成功");
    // 重新渲染表格
    exanPlan(page, limit);
    setIsOpen(false);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#FAFAFA",
        }}
      >
        <Space>
          <Search
            style={{ marginLeft: "10px" }}
            placeholder="请输入搜索内容~"
            onSearch={onSearch}
            enterButton
          />
        </Space>
        <Button type="primary" style={{ marginLeft: "25px" }}>
          导出全部
        </Button>
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          rowSelection={rowSelection}
          pagination={false}
          columns={columns}
          dataSource={tableData}
        />
        <Pagination
          style={{ textAlign: "right" }}
          total={total}
          current={page}
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          showTotal={(total) => `共 ${total} 条`}
        />
      </ConfigProvider>
      {/* 头部删除模态框 */}
      <Modal
        title={"成绩录入"}
        centered={true}
        width={300}
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Button style={{ marginLeft: "30px" }} shape="round">
          语文
        </Button>
        <Button style={{ marginLeft: "30px" }} shape="round">
          数学
        </Button>
      </Modal>
    </>
  );
}
