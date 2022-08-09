import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../view/admin/Home";
import Login from "../view/login/Login";
export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={Home} /> */}
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? <Home></Home> : <Redirect to="/login" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
