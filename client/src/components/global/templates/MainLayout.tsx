import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
//bg-gradient-to-r from-stone-100 via-blue-200 to-rose-200
const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="relative">
        <div className="fixed top-0 z-40 w-[100%] bg-white shadow-sm dark:from-slate-700 dark:via-slate-800 dark:to-slate-700">
          <Header />
        </div>
        <div className="mt-20 w-full">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default MainLayout
