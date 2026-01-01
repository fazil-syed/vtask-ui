import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

export default function PublicRoute() {
    //   const { isAuthenticated } = useSelector((state) => state.auth)

    //   if (isAuthenticated) {
    //     return <Navigate to="/" replace />
    //   }

    return <Outlet />
}
