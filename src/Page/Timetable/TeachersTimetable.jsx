//教师课表
import React from "react";
import { Table } from "antd";

export default function TeachersTimetable() {
  // 配置表格的表头
  const columns = [
    {
      title: "",
      colSpan: 2,
      dataIndex: "time",
      onCell: (record, rowIndex) => {
        if (rowIndex === 0) {
          // 上午课程，第一行要行合并4行
          return {
            rowSpan: 4,
          };
        } else if (rowIndex === 4) {
          // 设置上午和下午中间的空白行
          return {
            colSpan: 9,
          };
        } else if (rowIndex === 5) {
          // 下午的课程，行合并3行
          return {
            rowSpan: 3,
          };
        } else if (rowIndex === 8) {
          // 设置下午和晚上中间的空白行
          return {
            colSpan: 9,
          };
        } else if (rowIndex === 9) {
          // 晚上的课程，行合并2行
          return {
            rowSpan: 2,
          };
        } else {
          return {
            rowSpan: 0,
          };
        }
      },
    },
    {
      title: "",
      colSpan: 0,
      dataIndex: "index",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期一",
      dataIndex: "mon",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期二",
      dataIndex: "tus",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期三",
      dataIndex: "wen",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期四",
      dataIndex: "thurs",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期五",
      dataIndex: "fri",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期六",
      dataIndex: "sat",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
    {
      title: "星期日",
      dataIndex: "sun",
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0,
          };
        }
      },
    },
  ];

  // 表格的数据源
  const data = [
    // 上午的课
    {
      key: "1",
      time: "上午",
      index: 1,
      mon: "语文",
      tus: "数学",
      wen: "英语",
      thurs: "物理",
      fri: "音乐",
      sat: "",
      sun: "",
    },
    {
      key: "2",
      time: "上午",
      index: 2,
      mon: "语文",
      tus: "数学",
      wen: "英语",
      thurs: "物理",
      fri: "音乐",
      sat: "美术",
      sun: "体育",
    },
    {
      key: "3",
      time: "上午",
      index: 3,
      mon: "语文",
      tus: "",
      wen: "英语",
      thurs: "物理",
      fri: "音乐",
      sat: "美术",
      sun: "体育",
    },
    {
      key: "4",
      time: "上午",
      index: 4,
      mon: "语文",
      tus: "数学",
      wen: "英语",
      thurs: "物理",
      fri: "音乐",
      sat: "美术",
      sun: "体育",
    },
    // 上午课程和下午课程中间的空白行
    {
      key: "5",
    },
    // 下午的课程
    {
      key: "6",
      time: "下午",
      index: 5,
      mon: "语文",
      tus: "",
      wen: "英语",
      thurs: "物理",
      fri: "",
      sat: "",
      sun: "",
    },
    {
      key: "7",
      time: "下午",
      index: 6,
      mon: "语文",
      tus: "数学",
      wen: "",
      thurs: "",
      fri: "音乐",
      sat: "",
      sun: "体育",
    },
    {
      key: "8",
      time: "下午",
      index: 7,
      mon: "语文",
      tus: "",
      wen: "英语",
      thurs: "",
      fri: "音乐",
      sat: "",
      sun: "体育",
    },
    // 下午课程和晚上课程中间的空白行
    {
      key: "9",
    },
    // 晚上的课程
    {
      key: "10",
      time: "晚上",
      index: 8,
      mon: "语文",
      tus: "",
      wen: "英语",
      thurs: "物理",
      fri: "",
      sat: "",
      sun: "体育",
    },
    {
      key: "11",
      time: "晚上",
      index: 9,
      mon: "语文",
      tus: "数学",
      wen: "",
      thurs: "物理",
      fri: "",
      sat: "美术",
      sun: "体育",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </>
  );
}
