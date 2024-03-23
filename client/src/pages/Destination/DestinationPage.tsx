import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { MapIcon, PanelRightClose } from "lucide-react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import Map from "@/components/global/molecules/Map"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { getAllDestination, getAllDestinationType } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import ScrollbarType from "@/components/global/molecules/ScrollbarType"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import Filter from "@/components/global/molecules/Filter"

const DestinationPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isOverlayScrollType, setIsOverlayScrollType] = useState<boolean>(false)
  const { scrollY } = useScroll()
  const destinationList = useQuery({
    queryKey: ["destinations", page],
    queryFn: () => getAllDestination({ page }),
    placeholderData: keepPreviousData,
    staleTime: 5000
  })
  const destinationTypes = useQuery({
    queryKey: ["destinationType"],
    queryFn: getAllDestinationType
  })
  useMotionValueEvent(scrollY, "change", (current) => {
    current >= 70 ? setIsOverlayScrollType(true) : setIsOverlayScrollType(false)
  })
  return (
    <div className=" ">
      <div className="fixed bottom-6 right-8  z-10 mb-3 ml-4 rounded-full bg-white shadow-md">
        {isOpenMap ? (
          <div className="flex cursor-pointer gap-2  p-2 " onClick={() => setIsOpenMap(false)}>
            <PanelRightClose />
          </div>
        ) : (
          <div className="flex cursor-pointer gap-2 p-2  " onClick={() => setIsOpenMap(true)}>
            <MapIcon />
          </div>
        )}
      </div>
      <div className=" ">
        <div className={cn("flex items-center gap-10 px-20", isOverlayScrollType && "fixed top-0 bg-white md:w-full z-100"  )}>
          <div className=" flex py-4 md:w-4/5 ">
            <ScrollbarType data={destinationTypes.data?.data} />
          </div>
          <div className="item-center">
            <Filter />
          </div>
        </div>
        <div className={cn("grid mx-20", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div className="">
            <ListDestinations
              isShowMap={isOpenMap}
              data={destinationList.data?.data}
              loading={destinationList.isLoading}
            />
            {destinationList.data && (
              <PaginationCustom totalPages={destinationList.data?.totalPages} currentPage={page} setPage={setPage} />
            )}
          </div>
          <div className="flex items-center justify-center">{isOpenMap && <Map isHideHeader={isOverlayScrollType} />}</div>
        </div>
      </div>
    </div>
  )
}

export default DestinationPage
