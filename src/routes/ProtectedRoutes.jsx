import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { HomeOutlined } from "@ant-design/icons";
import TasksPage from "../pages/Tasks";

export const protectedNavigationItems = {
  home: {
    title: "Home",
    link: "/",
    icon: <HomeOutlined />,
    element: <TasksPage />,
  },
};
export const protectedRoutes = Object.values(protectedNavigationItems).map(
  (item) => {
    return {
      path: item.link,
      element: item.element,
    };
  }
);
const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
