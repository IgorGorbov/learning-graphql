import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Routes } from "../../constants/routers";
import { HomePage } from "../pages/Home";
import { HostPage } from "../pages/Host";
import { ListingsPage } from "../pages/Listings";
import { ListingPage } from "../pages/Listing";
import { UserPage } from "../pages/User";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.Home} component={HomePage} />
        <Route exact path={Routes.Host} component={HostPage} />
        <Route exact path={Routes.Listings} component={ListingsPage} />
        <Route exact path={Routes.Listing} component={ListingPage} />
        <Route exact path={Routes.User} component={UserPage} />
        <Route exact path={Routes.Login} component={LoginPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
