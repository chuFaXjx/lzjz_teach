import {
  Space,
  Table,
  Tag,
  Button,
  Drawer,
  message,
  Modal,
  Input,
  DatePicker,
  Select,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

//引入日期汉化
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";

import RoleMainForm from "../../components/Orientation/RoleMainForm";
import { roleList, delRole } from "../../api/role";

const { RangePicker } = DatePicker;
const RolMain = () => {
  //表格数据
  const [tableList, SetTablist] = useState([]);
  //表格加载图标
  const [updataIcon, SetUpdataIcon] = useState(false);
  //编辑表格数据
  const [editFormData, setEditFormData] = useState({});
  // 关闭/打开抽屉
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setEditFormData({});
    setVisible(true);
    setAdd_edti(false);
  };
  const onClose = () => {
    setVisible(false);
  };
  //获取表格数据
  let getList = async () => {
    let res = await roleList({ page: 1, limit: 10 });
    console.log(res);
    res.data.records.forEach((item) => {
      item.key = item.id;
      item.btns = ["编辑", "数据权限", "删除"];
    });
    console.log(res.data.records);
    SetTablist(res.data.records);
  };
  useEffect(() => {
    getList();
  }, []);

  // 表格数据发生变化开启加载数据
  useEffect(() => {
    SetUpdataIcon(true);
    setTimeout(() => {
      SetUpdataIcon(false);
    }, 800);
  }, [tableList]);

  //编辑/添加动态显示？
  const [add_edti, setAdd_edti] = useState(false);
  let editTableItem = (data) => {
    console.log("$$$", data.id);
    setEditFormData(data);
    setVisible(true);
    setAdd_edti(true);
  };

  // 删除表格
  let delTableItem = async (id) => {
    console.log(id);
    await delRole(id);
    const confirm = () => {
      Modal.confirm({
        title: "提示",
        icon: <ExclamationCircleOutlined />,
        content: "确认删除？",
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          await getList();
          message.success("删除成功");
        },
      });
    };
    confirm();
  };

  //inp查询事件
  const findObj = {
    //查询参数
    endTime: null,
    limit: 10,
    name: "",
    page: 1,
    startTime: null,
    status: "",
  };
  const handelInpName = (e) => {
    findObj.name = e.target.value;
  };
  const onChange = (value, dateString) => {
    findObj.startTime = dateString[0];
    findObj.endTime = dateString[1];
  };
  const handleChange = (value) => {
    findObj.status = value;
  };
  //查询后对表格二次赋值
  const ifFindRole = async () => {
    console.log(findObj);
    let res = await roleList(findObj);
    res.data.records.forEach((item) => {
      item.key = item.id;
    });
    console.log(res.data.records);
    res.data.records.forEach((item) => {
      item.key = item.id;
      item.btns = ["编辑", "数据权限", "删除"];
    });
    SetTablist(res.data.records);
  };

  //表格表头配置项
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          <Tag color={"blue"}>{status == 1 ? "正常" : "禁用"}</Tag>
        </>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      dataIndex: "address",
      key: "address",
      with: 150,
      render: (_, data) => (
        <>
          {data.btns.map((btn) => {
            let type = btn == "编辑" || "数据权限" ? "primary" : "dashed";

            return (
              <Button
                size="small"
                type={type}
                key={btn}
                ghost
                danger={btn == "删除" ? true : false}
                onClick={
                  btn == "编辑"
                    ? () => editTableItem(data)
                    : () => delTableItem(data.id)
                }
                style={{ marginRight: "5px" }}
              >
                {btn}
              </Button>
            );
          })}
        </>
      ),
    },
  ];

  const onOk = (value) => {
    console.log("onOk: ", value);
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
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Input onChange={handelInpName} placeholder="请输入角色名称" />
        <RangePicker showTime locale={locale} onChange={onChange} onOk={onOk} />
        <Select
          placeholder="请选择角色状态"
          style={{
            width: 150,
          }}
          allowClear
          onChange={handleChange}
        >
          <Select.Option value="1">正常</Select.Option>
          <Select.Option value="0">弃用</Select.Option>
        </Select>
        <Button
          type="primary"
          ghost
          onClick={ifFindRole}
          icon={<SearchOutlined />}
        >
          查询
        </Button>
      </Space>
      <br />
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          size="large"
          type="primary"
          ghost
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          添加
        </Button>
        <Button
          icon={<PrinterFilled />}
          onClick={handlePrint}
          style={{ marginLeft: "5px", width: "87.98px", height: "40px" }}
        ></Button>
        <Drawer
          title={!add_edti ? "新增菜单" : "编辑菜单"}
          width={450}
          onClose={onClose}
          visible={visible}
          bodyStyle={{
            paddingBottom: 80,
          }}
          destroyOnClose
          extra={
            <Space>
              <Button onClick={onClose}>返回</Button>
            </Space>
          }
        >
          <RoleMainForm
            editFormData={editFormData}
            getList={getList}
            onClose={onClose}
          />
        </Drawer>
      </Space>

      <Table
        id="TableToExport"
        columns={columns}
        dataSource={tableList}
        pagination={false}
        loading={updataIcon || tableList.length == 0 ? true : false}
      />
    </>
  );
};

export default RolMain;
