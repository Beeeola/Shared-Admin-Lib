/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataProvider from "./DataProvider";
import Spinner from "./primitives/Spinner";
import { DataContext } from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import appFireBase from "./adapters/backupFirebase";
export const WithRouter = ({
  heading,
  children,
  adapter,
  firebase,
  context,
  toNextPage = () => {},
  test = true
}) => {
  return jsx(DataProvider, {
    test: test // adapter={testServerAdapter}
    ,
    adapter: adapter,
    context: context,
    appFirebase: firebase || appFireBase,
    authenticateUser: token => new Promise(resolve => resolve(true))
  }, jsx(React.Suspense, {
    fallback: jsx(Spinner, null)
  }, jsx(Router, null, jsx(React.Fragment, null, heading, jsx(Switch, null, " ", jsx(Route, {
    path: "/login",
    render: props => {
      return jsx(DataContext.Consumer, null, ({
        dispatch,
        actions
      }) => {
        return jsx(LoginPage, {
          login: props => dispatch({
            type: actions.LOGIN_USER,
            value: props
          }),
          toNextPage: () => {
            toNextPage(props);
          }
        });
      });
    }
  }), children)))));
};
export default WithRouter;