import { DestinationType } from "@/lib/interface/destination.interface"
import TagType from "./TagType"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScrollbarTypeProps {
  data: DestinationType[] | null | undefined
  setTypeName: (typeName: string) => void
  typeName: string
}
const ScrollbarType = ({ data, setTypeName, typeName }: ScrollbarTypeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 200,
        behavior: "smooth"
      })
    }
  }

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 200,
        behavior: "smooth"
      })
    }
  }
  const handleClickTypeName = (clickType: string) => {
    if (clickType === typeName) {
      setTypeName("")
    } else {
      setTypeName(clickType)
    }
  }

  return (
    <div className=" relative flex h-[70px] items-center gap-2 overflow-hidden bg-white px-10 dark:bg-slate-700">
      <div
        className=" absolute left-0 ml-1 cursor-pointer rounded-lg  border-slate-50 p-1 shadow shadow-black/60 duration-1000 hover:-translate-y-1 dark:shadow-white"
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </div>
      <div className="scrollbar-custom flex gap-2 overflow-x-auto" ref={containerRef}>
        {data?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClickTypeName(item.typeName)
            }}
            className="flex items-center justify-center"
          >
            <TagType key={index} content={item.typeName} isActive={item.typeName === typeName} />
          </div>
        ))}
      </div>
      <div
        className=" absolute right-0 mr-1 cursor-pointer rounded-lg border-slate-50 p-1 shadow shadow-black/60 hover:-translate-y-1 dark:shadow-white"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </div>
    </div>
  )
}

export default ScrollbarType
