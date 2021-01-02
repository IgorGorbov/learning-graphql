import React from "react";
import { Layout } from "antd";

import Logo from "../../assets/logo.png";

export const AppHeaderSkeleton = () => {
  return (
    <Layout.Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img src={Logo} alt="App logo" />
        </div>
      </div>
    </Layout.Header>
  );
};
