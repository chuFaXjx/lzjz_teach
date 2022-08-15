import {
  Space,
  Table,
  Tag,
  Button,
  Drawer,
  message,
  Modal,
  DatePicker,
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import DepsForm from "../../components/Orientation/DepsForm"
import { depList, delDept } from "../../api/deps";

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
    let res = await depList();
    console.log(res);
    res.data.forEach((item) => {
      item.key = item.id;
      item.btns = ["编辑", "删除"];
    });

    // 递归将扁平化数组转成树形数组
    // function nest(pid, arr) {
    //   return arr
    //     .filter((item) => item.pid === pid)
    //     .map((item) => ({ ...item, children: nest(item.id, arr) }));
    // }
    // console.log(nest("0", res.data));
    // SetTablist(nest("0", res.data))

    const getChildren = (data, result, pid) => {
      for (const item of data) {
        if (item.pid === pid) {
          const newItem = { ...item, children: [] };
          result.push(newItem);
          getChildren(data, newItem.children, item.id);
        }
      }
    };
    const arrayToTree = (data, pid) => {
      const result = [];
      getChildren(data, result, pid);
      return result;
    };
    console.log(arrayToTree(res.data, "0"));
    SetTablist(arrayToTree(res.data, "0"));
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
    await delDept(id);
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

  //表格表头配置项
  const columns = [
    {
      title: "部门编码",
      dataIndex: "deptNo",
      key: "deptNo",
    },
    {
      title: "部门名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级部门名称",
      dataIndex: "pidName",
      key: "pidName",
    },
    {
      title: "层级关系编码",
      dataIndex: "relationCode",
      key: "relationCode",
    },
    {
      title: "部门经理",
      dataIndex: "managerName",
      key: "managerName",
    },
    {
      title: "经理联系方式",
      dataIndex: "phone",
      key: "phone",
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
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
                  btn == "删除"
                    ? () => delTableItem(data.id)
                    : () => editTableItem(data)
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

  return (
    <>
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
          <DepsForm
            treeList={tableList}
            editFormData={editFormData}
            getList={getList}
            onClose={onClose}
          />
        </Drawer>
      </Space>

      {tableList.length > 0 && (
        <Table
          columns={columns}
          dataSource={tableList}
          pagination={false}
          defaultExpandAllRows={true}
          loading={updataIcon || tableList.length == 0 ? true : false}
        />
      )}
    </>
  );
};

export default RolMain;
