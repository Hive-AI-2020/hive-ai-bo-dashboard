/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContext } from "contexts";
import {
  Login,
  Register,
  Home,
  MobileMenu,
  FourOFour,
  CreateCalendar
} from "views";
import { Layout } from "../layout";
import { LayoutConfig } from "configurations";
import { LoadingScreen } from "components";

export const AppRoutes = props => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage =
    LayoutConfig.landingPage !== undefined
      ? LayoutConfig.landingPage !== ""
        ? LayoutConfig.landingPage
        : "/"
      : "/";
  if (loginStatus === undefined) return <LoadingScreen />;
  return (

    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          loginStatus ? (
            <Redirect to={{ pathname: "/" }} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: landingPage
              }}
              {...props}
            />
          )
        }
      />

      <Route
        exact
        path="/login"
        render={() =>
          !loginStatus ? (
            <Login {...props} />
          ) : (
            <Redirect to={{ pathname: landingPage }} {...props} />
          )
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          !loginStatus ? (
            <Register {...props} />
          ) : (
            <Redirect to={{ pathname: landingPage }} {...props} />
          )
        }
      />
      <Route
        exact
        path="/home"
        render={() =>
            <Layout>
              <Home {...props} />
            </Layout>
        }
      />
    
      <Route
        exact
        path="/menu"
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/" }} {...props} />
          ) : (
            <Layout>
              {" "}
              <MobileMenu {...props} />
            </Layout>
          )
        }
      />
      <Route
        exact
        path="/create-calendar"
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/" }} {...props} />
          ) : (
            <Layout>
              {" "}
              <CreateCalendar {...props} />
            </Layout>
          )
        }
      />
      <Route
        render={() =>
          loginStatus === false ? (
            <Redirect to={{ pathname: "/" }} {...props} />
          ) : (
            <Layout>
              <FourOFour {...props} />
            </Layout>
          )
        }
      />
    </Switch>
  );
};

/**
 * Changelog 26/09/2019 - Sanchit Dang
 * - use loginStatus variable instead of stateVariable
 * - <Layout/> has to be used alongside every inner view
 * - removed use of trigger404 function
 */
