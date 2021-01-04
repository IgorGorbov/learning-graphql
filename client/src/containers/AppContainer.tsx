import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Affix, Layout, Spin } from "antd";

import { LoginDataProps, LoginProps, Viewer } from "../types";
import { LOGIN } from "../lib/graphql/mutations/login";
import { Routes } from "../constants/routers";
import { AppHeader } from "../components/ui/AppHeader";
import { HomePage } from "../components/pages/Home";
import { HostPage } from "../components/pages/Host";
import { ListingsPage } from "../components/pages/Listings";
import { ListingPage } from "../components/pages/Listing";
import { UserPage } from "../components/pages/User";
import { NotFoundPage } from "../components/pages/NotFound";
import { LoginPage } from "../components/pages/Login";
import { AppHeaderSkeleton } from "../components/ui/AppHeaderSkeleton";
import { ErrorBanner } from "../components/ui/ErrorBanner";

const initViewer = {
  id: undefined,
  token: undefined,
  avatar: undefined,
  hasWallet: false,
  didRequest: false
};

export function AppContainer() {
  const [viewer, setViewer] = useState<Viewer>(initViewer);

  const [login, { loading, error }] = useMutation<LoginProps, LoginDataProps>(LOGIN, {
    onCompleted: (data) => {
      if (data?.login) {
        setViewer(data.login);

        if (data.login.token) {
          sessionStorage.setItem("token", data.login.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  });

  useEffect(() => {
    login();
  }, []);

  if (loading) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching app" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout id="app">
      <Router>
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>

        <Switch>
          <Route exact path={Routes.Home} component={HomePage} />
          <Route exact path={Routes.Host} component={HostPage} />
          <Route exact path={Routes.Listings} component={ListingsPage} />
          <Route exact path={Routes.Listing} component={ListingPage} />
          <Route
            exact
            path={Routes.User}
            render={(props) => <UserPage {...props} viewer={viewer} setViewer={setViewer} />}
          />
          <Route exact path={Routes.Login} render={(props) => <LoginPage {...props} setViewer={setViewer} />} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>

      {error && <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />}
    </Layout>
  );
}
