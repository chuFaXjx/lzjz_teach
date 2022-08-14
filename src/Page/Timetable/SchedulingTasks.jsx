//排课任务
import React, { useEffect, useState, useRef } from "react";
// 引入antd中文包
import zhCN from "antd/es/locale/zh_CN";
import { QuestionCircleOutlined, PrinterFilled } from "@ant-design/icons";
import {
  Table,
  Button,
  Pagination,
  ConfigProvider,
  Space,
  Input,
  Popconfirm,
  Modal,
  message,
  Drawer,
  Descriptions,
} from "antd";
// 导入axios请求
import { listByPage, deleteItem } from "../../api/classSchedule/planClass";
// 导出表格
import { exportExcel } from "../../utils/xlsxall";

export default function ExaminationPlan() {
  // 表格表头的数据
  const columns = [
    {
      title: "排课计划",
      width: 30,
      dataIndex: "arrangingName",
      key: "arrangingName",
      fixed: "left",
      sorter: () => {},
    },
    {
      title: "学期",
      width: 20,
      dataIndex: "termId",
      key: "termId",
      sorter: () => {},
    },
    {
      title: "周上课天数",
      width: 30,
      dataIndex: "weekDayNum",
      key: "weekDayNum",
      sorter: () => {},
    },
    {
      title: "上午课程数",
      width: 30,
      dataIndex: "amNum",
      key: "amNum",
      sorter: () => {},
    },
    {
      title: "下午课程数",
      width: 30,
      dataIndex: "pmNum",
      key: "pmNum",
      sorter: () => {},
    },
    {
      title: "晚上课程数",
      width: 30,
      dataIndex: "nightNum",
      key: "nightNum",
      sorter: () => {},
    },
    {
      title: "状态",
      width: 20,
      dataIndex: "updateId",
      key: "updateId",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      width: 50,
      fixed: "right",
      render: (_, record) => (
        <div>
          <Button
            style={{ backgroundColor: "#009688", marginLeft: "5px" }}
            type="primary"
            size="small"
          >
            编辑
          </Button>
          <Popconfirm
            title={`确定删除${record.arrangingName}吗？`}
            onConfirm={(e) => handleDelete(record, e)}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <Button
              style={{ backgroundColor: "#FF5722", marginLeft: "5px" }}
              type="primary"
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //将要导出的数据存在state里
  const [list, setList] = useState([
    ["考试标题", "考试时间", "考试状态", "成绩编辑", "参考年级", "考试类型"],
  ]);
  const [aoa, setAoa] = useState([]);

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

  // 表单内容区域数据的数组
  const [tableData, SetTableData] = useState([]);
  // 分页器数据总条数
  const [total, Settotal] = useState("");
  // 分页器当前页、每页几条
  const [page, Setpage] = useState(1);
  const [limit, Setlimit] = useState(10);
  // 函数组件生命周期请求
  useEffect(() => {
    exanPlan(page, limit);
  }, []);
  // 请求表单数据
  async function exanPlan(page, limit) {
    const { data } = await listByPage({ page: page, limit: limit });
    Settotal(data.total);
    console.log(data.records);
    data.records.map((item) => {
      item.key = item.id;
      aoa.push([
        item.name,
        item.timeStart + "" + item.timeEnd,
        item.status,
        item.resultInputStatus,
        item.classType,
        item.examType,
      ]);
    });
    setList(aoa);
    // 更新表单内容区域数据
    SetTableData(data.records);
  }

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
    await deleteItem(selectedRowKeys);
    message.success("删除成功");
    // 重新渲染表格
    exanPlan(page, limit);
    setIsOpen(false);
  }
  // 表格中每一项的删除功能
  async function handleDelete(record, e) {
    await deleteItem([record.id]);
    message.success("删除成功");
    // 重新渲染表格
    exanPlan(page, limit);
  }

  // 分页器
  const onChange = (page, limit) => {
    // 更新页码和条数
    Setlimit(limit);
    Setpage(page);
    // 重新渲染表格
    exanPlan(page, limit);
  };
  // 点击全部导出
  function handleExcel() {
    exportExcel(list, "考试计划.xlsx");
  }
  const myTable = useRef(null);
  // 点击打印
  function handlePrint() {
    console.log(myTable.current);
    printJS({
      printable: "TableToExport",
      type: "html",
      // header: '三味书屋',
    });
  }

  return (
    <>
      {/* 头部区域 */}
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAFAFA",
        }}
      >
        <div className="left">
          <Button type="primary">添加</Button>
          <Button
            type="danger"
            onClick={showModal}
            style={{ marginLeft: "5px" }}
          >
            删除
          </Button>
          <Button
            onClick={handleExcel}
            type="primary"
            style={{ marginLeft: "5px" }}
          >
            导出Excele
          </Button>
          <Button
            icon={<PrinterFilled />}
            onClick={handlePrint}
            style={{ marginLeft: "5px", width: "68.32px", height: "32px" }}
          ></Button>
        </div>
        <Space style={{ marginLeft: "100px" }}>
          <Search
            placeholder="请输入搜索内容~"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </div>
      {/* 表格和分页器区域 */}
      <ConfigProvider locale={zhCN}>
        <Table
          ref={myTable}
          id="TableToExport"
          rowSelection={rowSelection}
          pagination={false}
          columns={columns}
          dataSource={tableData}
          scroll={{
            x: 1000,
            y: 350,
          }}
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
        title={"警告"}
        centered={true}
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>是否删除当前被选中的菜单项？</p>
      </Modal>
      {/* 点击详情的右侧弹出的抽屉 */}
      {/* <Drawer
        title="详情页"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={480}
        closeIcon={<CloseOutlined />}
      >
        <Descriptions title={examItem.name} layout="vertical" bordered>
          <Descriptions.Item label="参考年级">
            {examItem.gradeId}
          </Descriptions.Item>
          <Descriptions.Item label="考场监考人数">
            {examItem.invigilatorNum}
          </Descriptions.Item>
          <Descriptions.Item label="考试时间">
            {examItem.timeStart + "--" + examItem.timeEnd}
          </Descriptions.Item>
          <Descriptions.Item label="考试描述">
            {examItem.examDesc}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title="参考课程与班级、监考教师"
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="参考课程">
            {examItem.gradeId}
          </Descriptions.Item>
          <Descriptions.Item label="参考班级">
            {examItem.invigilatorNum}
          </Descriptions.Item>
          <Descriptions.Item label="监考老师">
            {examItem.timeStart + "--" + examItem.timeEnd}
          </Descriptions.Item>
          <Descriptions.Item label="考试信息">
            {examItem.examDesc}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="监考安排列表" layout="vertical" bordered>
          <Descriptions.Item label="考场">{examItem.gradeId}</Descriptions.Item>
          <Descriptions.Item label="科目"></Descriptions.Item>
          <Descriptions.Item label="监考老师"></Descriptions.Item>
          <Descriptions.Item label="考试日期"></Descriptions.Item>
          <Descriptions.Item label="考试时间"></Descriptions.Item>
        </Descriptions>
      </Drawer> */}
    </>
  );
}
