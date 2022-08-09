import Home from "../view/admin/Home";
import Login from "../view/login/Login";
import NotFound from "../view/NotFound";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
