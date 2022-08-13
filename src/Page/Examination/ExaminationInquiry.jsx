// 考务查询页面
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space } from "antd";
import {
  FolderOpenFilled,
  PrinterFilled,
  ProfileFilled,
} from "@ant-design/icons";
// 导入相关请求
import { getExamSeach } from "../../api/exam/examSeach";

export default function ExaminationPlan() {
  // 头部搜索框相关
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  // 表格表头的数据
  const columns = [
    {
      title: "考试标题",
      width: 35,
      dataIndex: "name",
      key: "name",
      sorter: () => {},
    },
    {
      title: "考试时间",
      width: 45,
      dataIndex: "time",
      key: "time",
      sorter: () => {},
    },
    {
      title: "考试状态",
      width: 35,
      dataIndex: "status",
      key: "status",
      sorter: () => {},
    },
    {
      title: "成绩编辑",
      width: 35,
      dataIndex: "name",
      key: "name",
      sorter: () => {},
    },
    {
      title: "参考年级",
      width: 35,
      dataIndex: "gradeId",
      key: "gradeId",
      sorter: () => {},
    },
    {
      title: "考试类型",
      width: 35,
      dataIndex: "examType",
      key: "examType",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      width: 33,
      render: () => (
        <div>
          <Button type="primary" size="small">
            详情
          </Button>
          <Button
            style={{ backgroundColor: "#009688", marginLeft: "5px" }}
            type="primary"
            size="small"
          >
            编辑
          </Button>
          <Button
            style={{ backgroundColor: "#FF5722", marginLeft: "5px" }}
            type="primary"
            size="small"
            danger
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

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
    examSeach(page, limit);
  }, []);
  // 请求表单数据
  async function examSeach(page, limit) {
    const { data } = await getExamSeach({ page: page, limit: limit });
    Settotal(data.total);
    console.log(data);
    // data.records.map((item) => {
    //   item.key = item.id;
    // });
    // 更新表单内容区域数据
    // SetTableData(data.records);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAFAFA",
        }}
      >
        <div className="left">
          <Button type="primary">添加</Button>
          <Button type="primary" style={{ marginLeft: "5px" }}>
            导出全部
          </Button>
        </div>
        <Space>
          <Search
            placeholder="请输入搜索内容~"
            onSearch={onSearch}
            enterButton
          />
        </Space>
        <div className="right">
          <Button icon={<ProfileFilled />}></Button>
          <Button
            icon={<FolderOpenFilled />}
            style={{ marginLeft: "5px" }}
          ></Button>
          <Button
            icon={<PrinterFilled />}
            style={{ marginLeft: "5px" }}
          ></Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        pagination={false}
        columns={columns}
        dataSource={tableData}
      />
    </>
  );
}
