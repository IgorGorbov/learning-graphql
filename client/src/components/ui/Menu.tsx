import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Menu } from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";

import { LogoutProps, Viewer } from "../../types";
import { Routes } from "../../constants/routers";
import { LOGOUT } from "../../lib/graphql/mutations/logout";
import { displayErrorMessage, displaySuccessNotification } from "../../lib/notifications";

interface MenuItemsProps {
  readonly viewer: Viewer;
  readonly setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: MenuItemsProps) => {
  const [logout] = useMutation<LogoutProps>(LOGOUT, {
    onCompleted: (data) => {
      if (data && data.logout) {
        setViewer(data.logout);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!")
  });

  const handleLogOut = useCallback(() => logout(), [logout]);

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Menu.Item key="/host">
        <Link to={Routes.Host}>
          <HomeOutlined />
          Host
        </Link>
      </Menu.Item>

      {viewer?.id && viewer?.avatar ? (
        <Menu.SubMenu title={<Avatar src={viewer.avatar} />}>
          <Menu.Item key="/user">
            <Link to={`/user/${viewer.id}`}>
              <UserOutlined />
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <div onClick={handleLogOut}>
              <LogoutOutlined />
              Log out
            </div>
          </Menu.Item>
        </Menu.SubMenu>
      ) : (
        <Menu.Item>
          <Link to="/login">
            <Button type="primary">Sign In</Button>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};
