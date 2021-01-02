import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import { Viewer } from "../../types";
import { MenuItems } from "./Menu";
import Logo from "../../assets/logo.png";

interface AppHeaderProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: AppHeaderProps) => {
  return (
    <Layout.Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={Logo} alt="App logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Layout.Header>
  );
};
