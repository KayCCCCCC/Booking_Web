import { DestinationType } from "@/lib/interface/destination"
import TagType from "./TagType"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScrollbarTypeProps {
  data: DestinationType[] | null | undefined
}
const ScrollbarType = ({ data }: ScrollbarTypeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 50
    }
  }

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 50
    }
  }
  
  return (
    <div className="relative flex items-center gap-2 overflow-hidden px-10 md:w-3/5">
      <div
        className="custom-button-scrollbar absolute left-0 cursor-pointer p-1 rounded-lg  shadow shadow-black/60 dark:shadow-white ml-1 border-slate-50 hover:-translate-y-1 "
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </div>
      <div className="flex gap-2 overflow-x-auto" ref={containerRef}>
        {data?.map((item, index) => <TagType key={index} content={item.typeName} />)}
      </div>
      <div
        className="custom-button-scrollbar absolute right-0 cursor-pointer p-1 shadow shadow-black/60 dark:shadow-white rounded-lg mr-1 border-slate-50 hover:-translate-y-1"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </div>
    </div>
  )
}

export default ScrollbarType
