import { HomeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Navigate, Outlet } from "react-router";
import { useFetchUserQuery } from "../features/auth/authApi";
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
  const isLoggedOut = useSelector((state) => state.auth.isLoggedOut);
  const { data: user, isLoading } = useFetchUserQuery(undefined, {
    skip: isLoggedOut,
  });
  if (isLoading) return <Spin fullscreen />;
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
