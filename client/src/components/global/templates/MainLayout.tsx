import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
import Footer from "../organisms/Footer"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { shouldHideScrollBack, shouldVisibleScrollBack } from "@/store/slices/GlobalSlice"
import { ChevronsUp } from "lucide-react"
import { RootState } from "@/store/store"

const MainLayout = () => {
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
      <div className="relative">
        <div className="bg-opacity-60 bg-gradient-to-r from-stone-100 via-blue-200 to-rose-200 dark:from-slate-400 dark:via-gray-300 dark:to-stone-500">
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
        {isVisibleScrollBack && (
          <div className="fixed bottom-20 right-8 flex items-center justify-center rounded-full border border-slate-50 bg-white p-2 shadow-md">
            <ChevronsUp />
          </div>
        )}
        <Footer />
      </div>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default MainLayout
