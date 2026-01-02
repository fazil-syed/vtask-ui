import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { protectedNavigationItems } from "../routes/ProtectedRoutes";

const NavBar = () => {
  const menuItemsGenerate = () => {
    let items = [];
    Object.keys(protectedNavigationItems).forEach((item, index) => {
      items.push({
        key: String(index + 1),
        icon: protectedNavigationItems[item].icon,
        label: protectedNavigationItems[item].title,
      });
    });
    return items;
  };
  return (
    <div
      style={{
        paddingTop: 16,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItemsGenerate()}
        style={{
          border: "none",
        }}
      />
      ;
    </div>
  );
};

export default NavBar;
