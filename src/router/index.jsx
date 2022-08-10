import { Navigate } from "react-router-dom";
import Home from "../view/admin/Home";
import Login from "../view/login/Login";
import NotFound from "../view/NotFound";

// 导入组织管理组件
import HomePage from "../Page/Organization/HomePage";
import MenuPer from "../Page/Organization/MenuPer";
import RoleMan from "../Page/Organization/RoleMan";

// 导入职工管理组件
import FacultyManagement from "../Page/Staff/FacultyManagement";

// 导入试题管理组件
import TestQuestion from "../Page/TestQuestion/TestQuestion";
import TypeManagement from "../Page/TestQuestion/TypeManagement";
import QuestionBank from "../Page/TestQuestion/QuestionBank";

// 导入考试管理组件
import ExaminationInquiry from "../Page/Examination/ExaminationInquiry";
import ExaminationPlan from "../Page/Examination/ExaminationPlan";
import MyExamination from "../Page/Examination/MyExamination";

// 导入成绩管理组件
import ScoreEntry from "../Page/Performance/ScoreEntry";
import ScoreQuery from "../Page/Performance/ScoreQuery";
import UnifiedEntry from "../Page/Performance/UnifiedEntry";

// 导入课表管理组件
import ClassTimetable from "../Page/Timetable/ClassTimetable";
import CourseTransfer from "../Page/Timetable/CourseTransfer";
import SchedulingTasks from "../Page/Timetable/SchedulingTasks";
import TeachersTimetable from "../Page/Timetable/TeachersTimetable";

// 导入教务管理组件
import ClassSet from "../Page/Educational/ClassSet";
import ClassManagement from "../Page/Educational/ClassManagement";
import ClassroomManagement from "../Page/Educational/ClassroomManagement";
import CourseManagement from "../Page/Educational/CourseManagement";
import DisciplineManagement from "../Page/Educational/DisciplineManagement";
import GradeManagement from "../Page/Educational/GradeManagement";
import StudentManagement from "../Page/Educational/StudentManagement";
import TermManagement from "../Page/Educational/TermManagement";

// 导入系统管理组件
import ArticleManagement from "../Page/System/ArticleManagement";
import CodeGeneration from "../Page/System/CodeGeneration";
import DiCtionaryManagement from "../Page/System/DiCtionaryManagement";
import FleManagement from "../Page/System/FleManagement";
import LogManagement from "../Page/System/LogManagement";
import ScheduledTasks from "../Page/System/ScheduledTasks";

// 导入其他组件（菜单的最后一项）
import FormConstruction from "../Page/Other/FormConstruction";
import DocText from "../Page/Other/DocText";
import SqlSearch from "../Page/Other/SqlSearch";

import AuthComponent from "../components/login/AuthComponent";
const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    element: (
      <AuthComponent>
        <Home />
        {/*  <Navigate to="/homepage" /> */}
      </AuthComponent>
    ),
    children: [
      // 组织管理
      {
        path: "menus",
        element: <MenuPer />,
      },
      {
        path: "roles",
        element: <RoleMan />,
      },
      {
        path: "depts",
        element: <HomePage />,
      },
      // 职工管理
      {
        path: "users",
        element: <FacultyManagement />,
      },
      // 试题管理
      {
        path: "dlTest",
        element: <TestQuestion />,
      },
      {
        path: "dlQuestionBank",
        element: <QuestionBank />,
      },
      {
        path: "dlQuestionType",
        element: <TypeManagement />,
      },
      // 考试管理
      {
        path: "dlExamPlan",
        element: <ExaminationPlan />,
      },
      {
        path: "dlExamList",
        element: <ExaminationInquiry />,
      },
      {
        path: "dlExamMyList", // 我的考务
        element: <MyExamination />,
      },
      // 成绩管理
      {
        path: "dlExamResult", // 成绩查询
        element: <ScoreQuery />,
      },
      {
        path: "dlExamResultInput", // 成绩录入
        element: <ScoreEntry />,
      },
      {
        path: "dlExamResultUnifyInput", // 统一录入
        element: <UnifiedEntry />,
      },
      // 课表管理
      {
        path: "dlArrangingCourse", // 排课任务
        element: <SchedulingTasks />,
      },
      {
        path: "teacherTable", // 教师课表
        element: <TeachersTimetable />,
      },
      {
        path: "classTable", // 班级课表
        element: <ClassTimetable />,
      },
      {
        path: "dlCourseTable", // 调课管理
        element: <CourseTransfer />,
      },
      // 教务管理
      {
        path: "dlClassTeacher", // 班级课程设置
        element: <ClassSet />,
      },
      {
        path: "dlClass", // 班级管理
        element: <ClassManagement />,
      },
      {
        path: "dlStudent", // 学生管理
        element: <StudentManagement />,
      },
      {
        path: "dlCourse", // 课程管理
        element: <CourseManagement />,
      },
      {
        path: "dlRoom", // 教室管理
        element: <ClassroomManagement />,
      },
      {
        path: "dlSubject", // 学科管理
        element: <DisciplineManagement />,
      },
      {
        path: "dlGrade", // 年级管理
        element: <GradeManagement />,
      },
      {
        path: "dlTerm", // 学期管理
        element: <TermManagement />,
      },
      // 系统管理
      {
        path: "sysGenerator", // 代码生成
        element: <CodeGeneration />,
      },
      {
        path: "sysFiles", // 文件管理
        element: <FleManagement />,
      },
      {
        path: "sysContent", // 文章管理
        element: <ArticleManagement />,
      },
      {
        path: "sysDict", // 字典管理
        element: <DiCtionaryManagement />,
      },
      {
        path: "sysJob", // 定时任务
        element: <ScheduledTasks />,
      },
      {
        path: "logs", // 日志管理
        element: <LogManagement />,
      },
      // 其他
      {
        path: "build", // 表单构建
        element: <FormConstruction />,
      },
      {
        path: "sql.html", // sql查询 好像用的是ifarme
        element: <SqlSearch />,
      },
      {
        path: "doc.html", // 接口管理 好像用的是ifarme
        element: <DocText />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
