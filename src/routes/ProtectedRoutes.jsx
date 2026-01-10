import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import TasksPage from "../pages/tasks/Tasks";

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
