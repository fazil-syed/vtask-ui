import { createBrowserRouter } from "react-router";
import PublicRoute from "./PublicRoutes";
import MainLayout from "../layouts/MainLayout";
import TasksPage from "../pages/Tasks";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/',
                        element: <TasksPage />
                    }
                ]
            }
        ]
    }
])