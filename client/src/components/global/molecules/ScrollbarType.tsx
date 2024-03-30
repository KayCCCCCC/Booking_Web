import { DestinationType } from "@/lib/interface/destination"
import TagType from "./TagType"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface ScrollbarTypeProps {
  data: DestinationType[] | null | undefined
  setTypeName: (typeName: string) => void
  typeName: string
}
const ScrollbarType = ({ data, setTypeName, typeName }: ScrollbarTypeProps) => {
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
    <div className="relative z-20 flex items-center gap-2 overflow-hidden bg-white px-10 dark:bg-slate-700">
      <div
        className="custom-button-scrollbar absolute left-0 ml-1 cursor-pointer rounded-lg  border-slate-50 p-1 shadow shadow-black/60 hover:-translate-y-1 dark:shadow-white "
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </div>
      <div className="flex gap-2 overflow-x-auto" ref={containerRef}>
        {data?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setTypeName(item.typeName)
            }}
            className="flex items-center justify-center"
          >
            <TagType key={index} content={item.typeName} isActive={item.typeName === typeName} />
          </div>
        ))}
      </div>
      <div
        className="custom-button-scrollbar absolute right-0 mr-1 cursor-pointer rounded-lg border-slate-50 p-1 shadow shadow-black/60 hover:-translate-y-1 dark:shadow-white"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </div>
    </div>
  )
}

export default ScrollbarType
