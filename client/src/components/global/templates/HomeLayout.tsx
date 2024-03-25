import { Outlet } from "react-router-dom"
import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import Banner from "../organisms/Banner"
import { ToastContainer } from "react-toastify"
import { Spotlight } from "../molecules/Spotlight"
import Footer from "../organisms/Footer"
import { useDispatch, useSelector } from "react-redux"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { shouldHideScrollBack, shouldVisibleScrollBack } from "@/store/slices/GlobalSlice"
import { RootState } from "@/store/store"
import { ChevronsUp } from "lucide-react"

const HomeLayout = () => {
  const dispatch = useDispatch()
  const { isVisibleScrollBack } = useSelector((state: RootState) => state.global)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!
      if (scrollYProgress.get() < 0.05) {
        dispatch(shouldHideScrollBack())
      } else {
        direction < 0 ? dispatch(shouldVisibleScrollBack()) : dispatch(shouldHideScrollBack())
      }
    }
  })
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
      <main className="flex w-full dark:bg-neutral-950">
        <Outlet />
        <ToastContainer />
      </main>
      {isVisibleScrollBack && (
        <div className="fixed bottom-20 right-8 flex items-center justify-center rounded-full border border-slate-50 bg-white p-2 shadow-md">
          <ChevronsUp />
        </div>
      )}
      <Footer />
    </ThemeProvider>
  )
}

export default HomeLayout
