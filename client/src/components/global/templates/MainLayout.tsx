import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
//bg-gradient-to-r from-stone-100 via-blue-200 to-rose-200
const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="relative">
        <div className="bg-opacity-70   shadow-sm dark:from-slate-700 dark:via-slate-800 dark:to-slate-700">
          <Header />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default MainLayout
