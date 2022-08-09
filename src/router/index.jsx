import Home from "../view/admin/Home";
import Login from "../view/login/Login";
import NotFound from "../view/NotFound";
import AuthComponent from "../components/login/AuthComponent";
const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <AuthComponent>
        <Home />
      </AuthComponent>
    ),
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
