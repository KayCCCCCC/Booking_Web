import { cn } from "@/lib/utils/cn"
import React from "react"
interface BannerProps {
  classContent: string
}
const Banner: React.FC<BannerProps> = ({ classContent }) => {
  return (
    <div
      className={cn(
        " bg-grid-white/[0.02] relative left-1/2 top-1/2 w-[66rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden antialiased ",
        classContent
      )}
    >
      <div className=" relative z-10  mx-auto w-full max-w-7xl p-4  pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text  text-4xl font-bold text-transparent sm:text-center md:text-7xl">
          Escape the ordinary,
          <br /> explore the extraordinary.
        </h1>
        {/* <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are drawing the
          attention towards the text section of the page. I don&apos;t know why but I&apos;m running out of copy.
        </p> */}
      </div>
    </div>
  )
}

export default Banner
