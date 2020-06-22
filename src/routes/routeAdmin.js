import React from "react";
import AdminHomePage from "../pages/adminPage";
import { Route, Switch } from "react-router-dom";

function AdminRoute() {
  return (
    <Switch>
      <Route path="/" component={AdminHomePage} />
      <Route path="**" component={AdminHomePage} />
    </Switch>
  );
}

export default AdminRoute;
