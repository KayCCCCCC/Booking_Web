import { useEffect, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMotionValueEvent, useScroll } from "framer-motion"
// import Map from "@/components/global/molecules/Map"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { filterDestinationByType, getAllDestinationType } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import ScrollbarType from "@/components/global/molecules/ScrollbarType"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import { MapIcon, PanelRightClose } from "lucide-react"
import MapCustom from "@/components/global/molecules/Map"

const DestinationPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isOverlayScrollType, setIsOverlayScrollType] = useState<boolean>(false)
  const [typeName, setTypeName] = useState<string>("")
  const { scrollY } = useScroll()
  const destinationTypes = useQuery({
    queryKey: ["destinationType"],
    queryFn: getAllDestinationType
  })

  const destinationFilterList = useQuery({
    queryKey: ["destinationFilter", typeName, page],
    queryFn: () => filterDestinationByType({ typeName, page }),
    placeholderData: keepPreviousData
  })

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 178 && isOverlayScrollType === false) {
      setIsOverlayScrollType(true)
    }
    if (current < 178 && isOverlayScrollType) {
      setIsOverlayScrollType(false)
    }
  })
  useEffect(() => {
    setPage(1)
  }, [typeName])
  return (
    <div className="">
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
      <div className="flex flex-col items-center justify-center gap-2 py-2">
        <div className="flex items-center justify-center gap-4 rounded-full border border-slate-200 px-20 dark:bg-slate-700 md:w-4/5">
          <div className=" flex py-2 md:w-full ">
            <ScrollbarType data={destinationTypes.data?.data} setTypeName={setTypeName} typeName={typeName} />
          </div>
        </div>
        {isOverlayScrollType && (
          <div className=" h-70 fixed left-0 right-0 top-1 z-10 mx-auto flex items-center justify-center gap-4 rounded-full border border-slate-100 bg-white px-20 opacity-95 dark:bg-slate-700 md:w-4/5">
            <div className=" flex py-4 md:w-[90%] ">
              <ScrollbarType data={destinationTypes.data?.data} setTypeName={setTypeName} typeName={typeName} />
            </div>
          </div>
        )}
        <div className={cn("mx-20 grid pt-2", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div className="">
            <ListDestinations
              isShowMap={isOpenMap}
              data={destinationFilterList.data?.data}
              loading={destinationFilterList.isLoading}
            />

            {destinationFilterList.data?.totalPages && (
              <PaginationCustom
                totalPages={destinationFilterList.data?.totalPages}
                currentPage={page}
                setPage={setPage}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            {/* {isOpenMap && <Map isHideHeader={isOverlayScrollType} useFor="destination" />} */}
            {isOpenMap && <MapCustom />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationPage
