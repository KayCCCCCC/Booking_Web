import { Outlet } from "react-router-dom"
import ThemeProvider from "../organisms/ThemeProvider"
import Header from "../organisms/Header"
import Banner from "../organisms/Banner"
import { Toaster } from "../atoms/toaster"
const HomeLayout = () => {
  return (
    <ThemeProvider>
      <div className="relative ">
        <img src="/nils-nedel-ONpGBpns3cs-unsplash.jpg" alt="@background" className="relative w-full   object-cover" />
      </div>
      <div className="absolute top-0">
        <Header />
        <Banner />
      </div>
      <main className="flex w-full flex-grow justify-center  dark:bg-neutral-950">
        <Outlet />
        <Toaster />
      </main>
    </ThemeProvider>
  )
}

export default HomeLayout
