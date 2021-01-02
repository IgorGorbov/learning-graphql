import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Affix, Layout } from "antd";

import { Viewer } from "../../types";
import { Routes } from "../../constants/routers";
import { HomePage } from "../pages/Home";
import { HostPage } from "../pages/Host";
import { ListingsPage } from "../pages/Listings";
import { ListingPage } from "../pages/Listing";
import { UserPage } from "../pages/User";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { AppHeader } from "../ui/AppHeader";

const client: any = new ApolloClient({ uri: "/api" });

const initViewer = {
  id: undefined,
  token: undefined,
  avatar: undefined,
  hasWallet: false,
  didRequest: false
};

export function App() {
  const [viewer, setViewer] = useState<Viewer>(initViewer);

  return (
    <ApolloProvider client={client}>
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
            <Route exact path={Routes.User} component={UserPage} />
            <Route exact path={Routes.Login} render={(props) => <LoginPage {...props} setViewer={setViewer} />} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}
