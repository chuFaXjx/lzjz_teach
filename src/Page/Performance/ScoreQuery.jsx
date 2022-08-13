//成绩查询
import React, { useEffect, useState } from "react";
// 引入antd中文包
import zhCN from "antd/es/locale/zh_CN";
import { CloseOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Pagination,
  ConfigProvider,
  Input,
  Tabs,
  Drawer,
  Descriptions,
} from "antd";
// 导入axios请求
import {
  studentList,
  examPlanList,
  classList,
} from "../../api/score/scoreSeach";
const { TabPane } = Tabs;

export default function ScoreQuery() {
  // 表格表头的数据
  const columns = [
    {
      title: "学生姓名",
      width: 35,
      dataIndex: "sName",
      key: "sName",
      sorter: () => {},
    },
    {
      title: "学生学号",
      width: 20,
      dataIndex: "sNo",
      key: "sNo",
      sorter: () => {},
    },
    {
      title: "学籍号",
      width: 20,
      dataIndex: "ssNo",
      key: "ssNo",
      sorter: () => {},
    },
    {
      title: "班级",
      width: 20,
      dataIndex: "classId",
      key: "classId",
      sorter: () => {},
    },
    {
      title: "性别",
      width: 35,
      dataIndex: "gender",
      key: "gender",
      sorter: () => {},
    },
    {
      title: "入学时间",
      width: 40,
      dataIndex: "joinTime",
      key: "joinTime",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      width: 30,
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => showDrawer(record)}
          >
            查看成绩
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
    scoreList(page, limit);
  }, []);
  // 请求表单数据
  async function scoreList(page, limit) {
    const { data } = await studentList({ page: page, limit: limit });
    console.log(data);
    Settotal(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 更新表单内容区域数据
    SetTableData(data.records);
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (key) => {
    console.log(key);
  };
  // 输入框的值
  const [nameInp, setnameInp] = useState("");
  const [numInp, setnumInp] = useState("");
  // 学生姓名框的值
  function nameInpChange({ target }) {
    setnameInp(target.value);
  }
  // 学籍号输入框的值
  function numInpChange({ target }) {
    setnumInp(target.value);
  }
  //学生成绩页面的搜索按钮
  async function handleSeach() {
    const { data } = await studentList({
      page,
      limit,
      sName: nameInp,
      ssNo: numInp,
    });
    console.log(data);
    Settotal(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 更新表单内容区域数据
    SetTableData(data.records);
  }

  // 点击详情弹出的抽屉
  const [examItem, setExamItem] = useState({});
  const [visible, setVisible] = useState(false);
  function showDrawer(record) {
    // 更新数据
    setExamItem(record);
    console.log(examItem);
    setVisible(true);
  }
  // 抽屉的关闭按钮
  function onClose() {
    setVisible(false);
  }
  // 分页器
  const onChange1 = (page, limit) => {
    // 更新页码和条数
    Setlimit(limit);
    Setpage(page);
    // 重新渲染表格
    scoreList(page, limit);
  };



  // 第二个tab选项的数据
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  const columns2 = [
    {
      title: "考试标题",
      dataIndex: "examTitle",
      key: "examTitle",
      sorter: () => {},
    },
    {
      title: "参考班级",
      dataIndex: "gradeId",
      key: "gradeId",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => showDrawer(record)}
          >
            查看成绩
          </Button>
        </div>
      ),
    },
  ];
  //Table表格选择框被选中的数组
  const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
  const onSelectChange2 = (selectedRowKeys2, selectedRows) => {
    // console.log(selectedRowKeys3, selectedRows);
    setSelectedRowKeys(selectedRowKeys2);
  };
  // 配置table表格的选择框(位置必须在下边)
  const rowSelection2 = {
    selectedRowKeys2,
    onChange: onSelectChange2,
  };
  // 表单内容区域数据的数组
  const [tableData2, SetTableData2] = useState([]);
  // 分页器数据总条数
  const [total2, Settotal2] = useState("");
  // 分页器当前页、每页几条
  const [page2, Setpage2] = useState(1);
  const [limit2, Setlimit2] = useState(10);
  // 函数组件生命周期请求
  useEffect(() => {
    getClassList(page2, limit2);
  }, []);
  // 请求表单数据
  async function getClassList(page2, limit2) {
    const { data } = await classList({
      page: page2,
      limit: limit2,
    });
    console.log(data);
    Settotal2(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 更新表单内容区域数据
    SetTableData2(data.records);
  }
  // 搜索框的val
  const [classInpVal, setClassInpVal] = useState("");
  function examInpChange2({ target }) {
    setClassInpVal(target.value);
  }
  // 查询考试标题
  async function handleSeach2() {
    let { data } = await classList({
      page: page2,
      limit: limit2,
      examTitle: classInpVal,
    });
    console.log(data);
    Settotal2(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 重新更新表单内容区域数据
    SetTableData2(data.records);
  }
  // 分页器
  const onChange2 = (page, limit) => {
    // 更新页码和条数
    Setlimit2(limit);
    Setpage2(page);
    // 重新渲染表格
    gradeList(page2, limit2);
  };
  // 第二个tab选项的数据
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------





  // 第三个tab选项的数据
  // 表格表头的数据
  const columns3 = [
    {
      title: "考试标题",
      width: 35,
      dataIndex: "name",
      key: "name",
      sorter: () => {},
    },
    {
      title: "参考年级",
      width: 20,
      dataIndex: "gradeId",
      key: "gradeId",
      sorter: () => {},
    },
    {
      title: "考试类型",
      width: 20,
      dataIndex: "examType",
      key: "examType",
      sorter: () => {},
    },
    {
      title: "考试时间",
      width: 20,
      dataIndex: "timeEnd",
      key: "timeEnd",
      sorter: () => {},
    },
    {
      title: "操作",
      key: "operation",
      width: 30,
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => showDrawer(record)}
          >
            查看成绩
          </Button>
        </div>
      ),
    },
  ];
  //Table表格选择框被选中的数组
  const [selectedRowKeys3, setSelectedRowKeys3] = useState([]);
  const onSelectChange3 = (selectedRowKeys3, selectedRows) => {
    // console.log(selectedRowKeys3, selectedRows);
    setSelectedRowKeys(selectedRowKeys3);
  };
  // 配置table表格的选择框(位置必须在下边)
  const rowSelection3 = {
    selectedRowKeys3,
    onChange: onSelectChange3,
  };
  // 表单内容区域数据的数组
  const [tableData3, SetTableData3] = useState([]);
  // 分页器数据总条数
  const [total3, Settotal3] = useState("");
  // 分页器当前页、每页几条
  const [page3, Setpage3] = useState(1);
  const [limit3, Setlimit3] = useState(10);
  // 函数组件生命周期请求
  useEffect(() => {
    gradeList(page3, limit3);
  }, []);
  // 请求表单数据
  async function gradeList(page3, limit3) {
    const { data } = await examPlanList({
      page: page3,
      limit: limit3,
      status: 2,
    });
    console.log(data);
    Settotal3(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 更新表单内容区域数据
    SetTableData3(data.records);
  }
  // 搜索框的val
  const [examInpVal, setExamInpVal] = useState("");
  function examInpChange({ target }) {
    setExamInpVal(target.value);
  }
  // 查询考试标题
  async function handleSeach3() {
    let { data } = await examPlanList({
      page: page3,
      limit: limit3,
      status: 2,
      name: examInpVal,
    });
    Settotal3(data.total);
    data.records.map((item) => {
      item.key = item.id;
    });
    // 重新更新表单内容区域数据
    SetTableData3(data.records);
  }

  // 分页器
  const onChange3 = (page, limit) => {
    // 更新页码和条数
    Setlimit3(limit);
    Setpage3(page);
    // 重新渲染表格
    gradeList(page3, limit3);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onChange1} type="card">
        <TabPane tab="学生成绩查询" key="1">
          {/* 头部区域 */}
          <div
            style={{
              width: "100%",
              height: "90px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Input
              onChange={nameInpChange}
              style={{
                width: 150,
                marginLeft: "10px",
              }}
              placeholder="请输入学生姓名~"
            />
            <Input
              onChange={numInpChange}
              style={{
                width: 150,
                marginLeft: "10px",
              }}
              placeholder="请输入学生学籍号~"
            />
            <Button
              onClick={handleSeach}
              type="primary"
              style={{ marginLeft: "10px" }}
            >
              查询
            </Button>
          </div>
          {/* 表格和分页器区域 */}
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
              showTotal={(total) => `共 ${total}条 `}
            />
          </ConfigProvider>
          {/* 点击详情的右侧弹出的抽屉 */}
          <Drawer
            title="查看成绩"
            placement="right"
            onClose={onClose}
            visible={visible}
            width={480}
            closeIcon={<CloseOutlined />}
          >
            <Descriptions title="学生考试分析报告" layout="vertical" bordered>
              <Descriptions.Item label="考试名称"></Descriptions.Item>
              <Descriptions.Item label="学生姓名"></Descriptions.Item>
              <Descriptions.Item label="语文成绩"></Descriptions.Item>
              <Descriptions.Item label="数学成绩"></Descriptions.Item>
              <Descriptions.Item label="英语成绩"></Descriptions.Item>
              <Descriptions.Item label="总分"></Descriptions.Item>
              <Descriptions.Item label="操作"></Descriptions.Item>
            </Descriptions>
            <Descriptions title="成绩统计分析图" layout="vertical" bordered>
              <p>柱状图</p>
              <p>折线图</p>
            </Descriptions>
          </Drawer>
        </TabPane>
        <TabPane tab="班级成绩统计" key="2">
          {/* 头部区域 */}
          <div
            style={{
              width: "100%",
              height: "90px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Input
              onChange={examInpChange2}
              style={{
                width: 300,
                marginLeft: "5px",
              }}
              placeholder="请输入考试标题~"
            />
            <Button
              onClick={handleSeach2}
              type="primary"
              style={{ marginLeft: "5px" }}
            >
              查询
            </Button>
          </div>
          {/* 表格和分页器区域 */}
          <ConfigProvider locale={zhCN}>
            <Table
              rowSelection={rowSelection2}
              pagination={false}
              columns={columns2}
              dataSource={tableData2}
            />
            <Pagination
              style={{ textAlign: "right" }}
              total={total2}
              current={page2}
              showSizeChanger
              showQuickJumper
              onChange={onChange2}
              showTotal={(total2) => `共 ${total2}条 `}
            />
          </ConfigProvider>
          {/* 点击详情的右侧弹出的抽屉 */}
          <Drawer
            title="班级学生考试分析报告"
            placement="right"
            onClose={onClose}
            visible={visible}
            width={480}
            closeIcon={<CloseOutlined />}
          >
            <Descriptions title="成绩分析列表" layout="vertical" bordered>
              <Descriptions.Item label="考试名称"></Descriptions.Item>
              <Descriptions.Item label="学生姓名"></Descriptions.Item>
              <Descriptions.Item label="语文成绩"></Descriptions.Item>
              <Descriptions.Item label="数学成绩"></Descriptions.Item>
              <Descriptions.Item label="英语成绩"></Descriptions.Item>
              <Descriptions.Item label="总分"></Descriptions.Item>
              <Descriptions.Item label="操作"></Descriptions.Item>
            </Descriptions>
            <Descriptions title="班级成绩分析图" layout="vertical" bordered>
              <h1>班级课程成绩分布图</h1>
              <p>柱状图</p>
            </Descriptions>
          </Drawer>
        </TabPane>
        <TabPane tab="年级成绩统计" key="3">
          {/* 头部区域 */}
          <div
            style={{
              width: "100%",
              height: "90px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Input
              onChange={examInpChange}
              style={{
                width: 300,
                marginLeft: "5px",
              }}
              placeholder="请输入考试标题~"
            />
            <Button
              onClick={handleSeach3}
              type="primary"
              style={{ marginLeft: "5px" }}
            >
              查询
            </Button>
          </div>
          {/* 表格和分页器区域 */}
          <ConfigProvider locale={zhCN}>
            <Table
              rowSelection={rowSelection3}
              pagination={false}
              columns={columns3}
              dataSource={tableData3}
            />
            <Pagination
              style={{ textAlign: "right" }}
              total={total3}
              current={page3}
              showSizeChanger
              showQuickJumper
              onChange={onChange3}
              showTotal={(total3) => `共 ${total3}条 `}
            />
          </ConfigProvider>
          {/* 点击详情的右侧弹出的抽屉 */}
          <Drawer
            title="年级学生考试分析报告"
            placement="right"
            onClose={onClose}
            visible={visible}
            width={480}
            closeIcon={<CloseOutlined />}
          >
            <Descriptions
              title="年级学生考试分析报告"
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="科目"></Descriptions.Item>
              <Descriptions.Item label="总分"></Descriptions.Item>
              <Descriptions.Item label="100%-90%"></Descriptions.Item>
              <Descriptions.Item label="90%-80%"></Descriptions.Item>
              <Descriptions.Item label="80%-70%"></Descriptions.Item>
              <Descriptions.Item label="70%-60%"></Descriptions.Item>
              <Descriptions.Item label="60%-30%"></Descriptions.Item>
              <Descriptions.Item label="30%-0%"></Descriptions.Item>
              <Descriptions.Item label="平均分"></Descriptions.Item>
            </Descriptions>
            <Descriptions title="班级成绩信息列表" layout="vertical" bordered>
              <Descriptions.Item label="班级"></Descriptions.Item>
              <Descriptions.Item label="学科"></Descriptions.Item>
              <Descriptions.Item label="总分"></Descriptions.Item>
              <Descriptions.Item label="100%-90%"></Descriptions.Item>
              <Descriptions.Item label="90%-80%"></Descriptions.Item>
              <Descriptions.Item label="80%-70%"></Descriptions.Item>
              <Descriptions.Item label="70%-60%"></Descriptions.Item>
              <Descriptions.Item label="60%-30%"></Descriptions.Item>
              <Descriptions.Item label="30%-0%"></Descriptions.Item>
              <Descriptions.Item label="平均分"></Descriptions.Item>
            </Descriptions>
            <Descriptions title="成绩分布图" layout="vertical" bordered>
              <Descriptions.Item label="班级成绩分布图">
                <p>折线图</p>
              </Descriptions.Item>
              <Descriptions.Item label="年级成绩分布图">
                <p>折线图</p>
              </Descriptions.Item>
            </Descriptions>
          </Drawer>
        </TabPane>
      </Tabs>
    </>
  );
}
