import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch, } from "react-router-dom";
import App from "../App";
import Admin from "../view/Home";
import home from "../components/content/home";
import join from "../components/content/join";
class React extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <App>
            <NavLink>
              <Route path="/Admin" component={Admin}></Route>
            </NavLink>
            <Switch>
              <Route to="/Admin/home" component={home}></Route>
              <Route to="/Admin/join" component={join}></Route>
            </Switch>
          </App>
        </BrowserRouter>
      </div>
    );
  }
}
export default React;
