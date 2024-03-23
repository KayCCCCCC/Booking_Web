import { useEffect, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { MapIcon, PanelRightClose } from "lucide-react"
import Map from "@/components/global/molecules/Map"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { getAllDestination, getAllDestinationType } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import ScrollbarType from "@/components/global/molecules/ScrollbarType"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"

const DestinationPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
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
  console.log(destinationTypes.data?.data)
  console.log(destinationList.data?.totalPages)

  return (
    <div className="">
      <div className="fixed bottom-0 right-80  z-10 mb-3 ml-4 ">
        {isOpenMap ? (
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-rose-600 px-3 py-2 font-medium text-white"
            onClick={() => setIsOpenMap(false)}
          >
            <div className="">Hide map</div>
            <PanelRightClose />
          </div>
        ) : (
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-rose-600 px-3 py-2 font-medium text-white"
            onClick={() => setIsOpenMap(true)}
          >
            <div>Show map</div>
            <MapIcon />
          </div>
        )}
      </div>
      <div>
        <div className="relative ml-10 flex px-10 py-2">
          <ScrollbarType data={destinationTypes.data?.data} />
        </div>
        <div className={cn("grid", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div>
            <ListDestinations
              isShowMap={isOpenMap}
              data={destinationList.data?.data}
              loading={destinationList.isLoading}
            />
          </div>
          <div>{isOpenMap && <Map />}</div>
          {/* </div> */}
        </div>
        {destinationList.data && (
          <PaginationCustom totalPages={destinationList.data?.totalPages} currentPage={page} setPage={setPage} />
        )}
      </div>
    </div>
  )
}

export default DestinationPage
