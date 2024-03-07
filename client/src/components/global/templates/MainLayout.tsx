import ThemeProvider from "@/components/global/organisms/ThemeProvider"
import Header from "../organisms/Header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <ThemeProvider>
      <Header />
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default MainLayout
