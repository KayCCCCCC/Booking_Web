import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMotionValueEvent, useScroll } from "framer-motion"
import Map from "@/components/global/molecules/Map"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { filterDestinationByType, getAllDestinationType } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import ScrollbarType from "@/components/global/molecules/ScrollbarType"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import Filter from "@/components/global/molecules/Filter"
import { MapIcon, PanelRightClose } from "lucide-react"
import { getAllAccommodations } from "@/lib/services/AccommodationServices"
import ListAccommodation from "@/components/local/Accommodation/ListAccommodation"
import { Input } from "@/components/global/atoms/input"
import { DropdownMenu } from "@/components/global/atoms/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import CalendarCustom from "@/components/global/molecules/CalendarCustom"
import FilterAccommodation from "@/components/global/molecules/FilterAccommodation"
import { DayPickerProvider } from "react-day-picker"

const StaysPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isOverlayScrollType, setIsOverlayScrollType] = useState<boolean>(false)
  const [typeName, setTypeName] = useState<string>("")
  const { scrollY } = useScroll()
  const accommodationList = useQuery({
    queryKey: ["accommodations", page],
    queryFn: () => getAllAccommodations({ page }),
    placeholderData: keepPreviousData,
    staleTime: 5000
  })

  // useMotionValueEvent(scrollY, "change", (current) => {
  //   if (current > 140 && isOverlayScrollType === false) {
  //     setIsOverlayScrollType(true)
  //   }
  //   if (current < 140 && isOverlayScrollType) {
  //     setIsOverlayScrollType(false)
  //   }
  // })

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
      <div className="gap- flex flex-col items-center justify-center">
        <DayPickerProvider
          initialProps={{
            selected: new Date(),
            numberOfMonths: 2
          }}
        >
          <FilterAccommodation />
        </DayPickerProvider>

        <div className={cn("mx-20 grid pt-2 ", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div className="flex flex-col -z-10">
            <ListAccommodation
              isShowMap={isOpenMap}
              data={accommodationList.data?.data}
              loading={accommodationList.isLoading}
            />

            {/* {accommodationList.data?.totalPages && (
              <PaginationCustom totalPages={accommodationList.data?.totalPages} currentPage={page} setPage={setPage} />
            )} */}
          </div>
          <div className="flex items-center justify-center">
            {isOpenMap && <Map isHideHeader={isOverlayScrollType} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaysPage
