import { Outlet } from "react-router-dom"
import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import Banner from "../organisms/Banner"
import { ToastContainer } from "react-toastify"
import { Spotlight } from "../molecules/Spotlight"

const HomeLayout = () => {
  return (
    <ThemeProvider>
      <div className="relative w-full">
        <img src="/mainBG.jpg" alt="@background" className="h-md w-full  object-cover" />
      </div>
      <div className="absolute top-0 min-w-full">
        <div className="bg-grid-white/[0.02] relative flex h-md w-full bg-black/[0.3]  ">
          <Header classContent="top-0 z-10 " />
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="white" />
          <Banner classContent="z-10 absolute" />
        </div>
      </div>
      <main className="flex w-full flex-grow justify-center  dark:bg-neutral-950">
        <Outlet />
        <ToastContainer />
      </main>
    </ThemeProvider>
  )
}

export default HomeLayout
