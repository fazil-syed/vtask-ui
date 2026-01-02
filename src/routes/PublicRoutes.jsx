import { Outlet } from "react-router";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
export const publicRoutes = [
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
];
export default function PublicRoutes() {
  return <Outlet />;
}
