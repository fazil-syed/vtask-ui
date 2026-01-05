import { HomeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Navigate, Outlet } from "react-router";
import TasksPage from "../pages/Tasks";
import { useSelector } from "react-redux";

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
  const authState = useSelector((state) => state.auth.authState);
  return authState === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default ProtectedRoutes;
