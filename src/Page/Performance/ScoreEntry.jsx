// 成绩查询页面
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space ,Pagination} from "antd";
// 导入相关请求
import { myList } from "../../api/score/scoreReg";

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
      dataIndex: "time",
      key: "time",
      sorter: () => {},
    },
    {
      title: "班级",
      dataIndex: "status",
      key: "status",
      sorter: () => {},
    },
    {
      title: "考试科目",
      width: 35,
      dataIndex: "name",
      key: "name",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
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
    const { data } = await myList({ page: page, limit: limit });
    Settotal(data.total);
    console.log(data);
    // data.records.map((item) => {
    //   item.key = item.id;
    // });
    // 更新表单内容区域数据
    // SetTableData(data.records);
  }

  // 分页器
  const onChange = (page, limit) => {
    // 更新页码和条数
    Setlimit(limit);
    Setpage(page);
    // 重新渲染表格
    exanPlan(page, limit);
  };

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
    </>
  );
}
