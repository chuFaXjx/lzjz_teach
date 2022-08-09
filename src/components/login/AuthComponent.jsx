//1.判断token是否存在
//2.如果存在正常渲染
//3.如果不存在调转到登录页面
import { Navigate } from "react-router";
function AuthComponent({ children }) {
  const isToken = localStorage.getItem("REACT_ADMIN_TOKEN");
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AuthComponent;

//调用该组件的方式传入一个组件 {/* <AuthComponents> <layout /> </AuthComponents> */}
//登录 <><layout /></>
//非登录 <Navigate to="/login" replace />;
