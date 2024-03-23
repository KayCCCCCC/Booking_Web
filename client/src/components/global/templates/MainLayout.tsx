import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
import Footer from "../organisms/Footer"

const MainLayout = () => {
  return (
    <ThemeProvider>
      <div className="bg-opacity-60 bg-gradient-to-r from-stone-100 via-blue-200 to-rose-200 dark:from-slate-400 dark:via-gray-300 dark:to-stone-500">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default MainLayout
