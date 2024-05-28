import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import RouterEndPoint from "@/constants/RouterEndPoint"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state?.auth)
  if (!isAuthenticated) {
    return <Navigate to={RouterEndPoint.SignIn} />
  }

  return children
}

export default ProtectedRoute
