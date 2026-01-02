import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoutes, { protectedRoutes } from "./ProtectedRoutes";
import PublicRoutes, { publicRoutes } from "./PublicRoutes";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: protectedRoutes,
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <AuthLayout />,
        children: publicRoutes,
      },
    ],
  },
]);
