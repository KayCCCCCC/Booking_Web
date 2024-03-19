import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="bg-bgLight"><Header /></div>
      <div>
        <Outlet />
      </div>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default MainLayout
