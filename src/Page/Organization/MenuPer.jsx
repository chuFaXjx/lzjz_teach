import { Space, Table, Tag, Button, Drawer, message, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined,PrinterFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import MenuPerDeawer from "../../components/Orientation/MenuPerDeawer";
import { allMenuList, delMenuItem } from "../../api/menu";

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

const App = () => {
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
    let res = await allMenuList();
    res.data.forEach((item) => {
      item.key = item.id;
      (item.tags = ["已启用"]),
        (item.btns = ["编辑", "删除"]),
        item.children.forEach((cItem) => {
          cItem.key = cItem.id;
          (cItem.tags = ["已启用"]),
            (cItem.btns = ["编辑", "删除"]),
            cItem.children.forEach((sItem) => {
              sItem.key = sItem.id;
              (sItem.tags = ["已启用"]),
                (sItem.btns = ["编辑", "删除"]),
                delete sItem.children;
            });
        });
    });
    console.log(res.data);
    SetTablist(res.data);
  };

  useEffect(() => {
    getList();
  }, []);
  // 表格数据发生变化开启加载数据
  useEffect(() => {
    SetUpdataIcon(true);
    setTimeout(() => {
      SetUpdataIcon(false);
    }, 2000);
  }, [tableList]);

  //编辑/添加/删除表格
  let addTableItem = () => {};
  //编辑/添加？
  const [add_edti, setAdd_edti] = useState(false);
  let editTableItem = (data) => {
    console.log(data);
    setEditFormData(data);
    setVisible(true);
    setAdd_edti(true);
  };

  let delTableItem = async (id) => {
    console.log(id);
    await delMenuItem(id);
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
      title: "菜单名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",

      render: (_, { type }) => {
        let color = null;
        if (type == 1) {
          type = "目录";
          color = "green";
        } else if (type == 2) {
          type = "菜单";
          color = "blue";
        } else {
          type = "按钮";
          color = "cyan";
        }
        return (
          <>
            <Tag color={color} key={type}>
              {type}
            </Tag>
          </>
        );
      },
    },
    {
      title: "父级名称",
      dataIndex: "pidName",
      key: "pidName",
    },
    {
      title: "排序",
      dataIndex: "orderNum",
      key: "orderNum",
    },
    {
      title: "资源标识",
      dataIndex: "perms",
      key: "perms",
    },
    {
      title: "状态",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={"blue"} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "操作",
      dataIndex: "address",
      key: "address",
      with: 150,
      render: (_, data) => (
        <>
          {data.btns.map((btn) => {
            let type = btn == "编辑" ? "primary" : "dashed";

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

  // 点击打印
  function handlePrint() {
    // console.log(myTable.current);
    printJS({
      printable: "TableToExport",
      type: "html",
      // header: '三味书屋',
    });
  }

  const [checkStrictly, setCheckStrictly] = useState(false);
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
        <Button
          icon={<PrinterFilled />}
          onClick={handlePrint}
          size="large"
          style={{ marginLeft: "5px" }}
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
          <MenuPerDeawer
            editFormData={editFormData}
            getList={getList}
            onClose={onClose}
          />
        </Drawer>
      </Space>

      <Table
        id="TableToExport"
        columns={columns}
        // rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={tableList}
        pagination={false}
        loading={updataIcon || tableList.length == 0 ? true : false}
      />
    </>
  );
};

export default App;
