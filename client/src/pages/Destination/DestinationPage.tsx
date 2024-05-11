import { useEffect, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { filterDestinationByType, getAllDestinationType } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import ScrollbarType from "@/components/global/molecules/ScrollbarType"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import MapCustom from "@/components/global/molecules/Map"
import { Coordinates } from "@/lib/interface/coordinates.interface"
import { useDispatch } from "react-redux"
import { saveListPlace } from "@/store/slices/DestinationSlice"
import { MapIcon, PanelRightClose } from "lucide-react"

const DestinationPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [hoverPlace, setHoverPlace] = useState<Coordinates | null>(null)
  const [page, setPage] = useState<number>(1)
  const [typeName, setTypeName] = useState<string>("")
  const dispatch = useDispatch()
  const destinationTypes = useQuery({
    queryKey: ["destinationType"],
    queryFn: getAllDestinationType
  })

  const destinationFilterList = useQuery({
    queryKey: ["destinationFilter", typeName, page],
    queryFn: () => filterDestinationByType({ typeName, page }),
    placeholderData: keepPreviousData
  })
  useEffect(() => {
    if (destinationFilterList.data?.data) {
      dispatch(saveListPlace(destinationFilterList.data.data))
    }
  }, [destinationFilterList.data?.data])

  const openMap = () => setIsOpenMap(true)
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
          <div className="flex cursor-pointer gap-2 p-2  " onClick={openMap}>
            <MapIcon />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-2">
        <div className="flex items-center justify-center gap-4 rounded-full px-4 dark:bg-slate-700 md:w-4/5">
          <div className=" fixed left-0 right-0 top-20 z-10 mx-auto flex h-[60px] items-center justify-center gap-4 rounded-full border border-slate-100 bg-white px-4 opacity-95 dark:bg-slate-700 md:w-4/5">
            <ScrollbarType data={destinationTypes.data?.data} setTypeName={setTypeName} typeName={typeName} />
          </div>
        </div>
        <div className={cn("mx-20 mt-8 grid pt-2", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div className="">
            <ListDestinations
              setHoverPlace={setHoverPlace}
              isShowMap={isOpenMap}
              openMap={openMap}
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
          <div className="fixed bottom-0 right-0 flex items-center justify-center">
            {isOpenMap && <MapCustom hoverPlace={hoverPlace ?? null} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationPage
