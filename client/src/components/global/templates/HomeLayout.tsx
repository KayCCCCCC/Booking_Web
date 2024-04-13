import { Outlet } from "react-router-dom"
import ThemeProvider from "@/components/global/organisms/context/ThemeProvider"
import Header from "../organisms/Header"
import Banner from "../organisms/Banner"
import { ToastContainer } from "react-toastify"
import { Spotlight } from "../molecules/Spotlight"
import Footer from "../organisms/Footer"
import { useMotionValueEvent, useScroll, motion, useAnimate } from "framer-motion"
import { ChevronsUp } from "lucide-react"
import { useState } from "react"

const HomeLayout = () => {
  const [scope] = useAnimate()
  const [isScrollBack, setIsScrollBack] = useState<boolean>(false)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!
      if (scrollYProgress.get() < 0.05) {
        setIsScrollBack(false)
      } else {
        direction < 0 ? setIsScrollBack(true) : setIsScrollBack(false)
      }
    }
  })
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <ThemeProvider>
      <div className="relative w-full">
        <img src="/mainBG.jpg" alt="@background" className="h-md w-full  object-cover" />
      </div>
      <div className="absolute top-0 min-w-full">
        <div className="bg-grid-white/[0.02] relative flex h-md w-full bg-black/[0.3]  " ref={scope}>
          <Header classContent="top-0 z-10 " />
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="white" />
          <Banner classContent="z-10 absolute" />
        </div>
      </div>
      <main className="flex w-full dark:bg-neutral-950">
        <Outlet />
        <ToastContainer />
      </main>
      {isScrollBack && (
        <motion.div
          className="fixed bottom-20 right-8 flex animate-bounce cursor-pointer items-center justify-center rounded-full border border-slate-50 bg-white p-2 shadow-md"
          onClick={scrollToTop}
        >
          <ChevronsUp />
        </motion.div>
      )}
      <Footer />
    </ThemeProvider>
  )
}

export default HomeLayout
