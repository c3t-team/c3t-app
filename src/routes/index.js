import React, { useState, useEffect } from "react";
import AdminRoute from "./routeAdmin";
import CustomerRoute from "./routeCustomer";
import loginPage from "../pages/loginPage";
import SignPage from "../pages/SignPage";
import { Route, Switch } from "react-router-dom";
import "react-id-swiper/lib/styles/css/swiper.css";
import NotFoundPage from "../pages/notFound";
import { connect } from "react-redux";
import { atcGetCurentUserRequest } from "../actions";


function App(props) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    props.getCurrentUser(token);
  }, []);

  useEffect(() => {
    console.log("currr", props.currentUser);
  }, [props.currentUser]);

  return (
    <>
      <Switch>
        {props.currentUser &&
          props.currentUser.role != null &&
          props.currentUser.role != "customer" && (
            <Route path="/admin" component={AdminRoute} />
          )}
        {!props.currentUser.role && (
          <Route path="/login" component={loginPage} />
        )}
        {!props.currentUser.role && <Route path="/sign" component={SignPage} />}
        <Route path="/" component={CustomerRoute} />
        <Route path="**" component={NotFoundPage} />
      </Switch>
    </>
  );
}

const stateMapToprops = (state, props) => {
  return {
    currentUser: state.user
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getCurrentUser: token => {
      dispatch(atcGetCurentUserRequest(token));
    }
  };
};

export default connect(stateMapToprops, dispatchMapToProps)(App);
