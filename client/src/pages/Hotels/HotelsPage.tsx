import { useEffect, useState } from "react"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
// import Map from "@/components/global/molecules/Map"
import { cn } from "@/lib/utils/cn"
import { MapIcon, PanelRightClose, RotateCcw } from "lucide-react"
import { filterHotels } from "@/lib/services/HotelServices"
import { DayPickerProvider } from "react-day-picker"
import { useMotionValueEvent, useScroll } from "framer-motion"
import ListHotel from "@/components/local/Hotel/ListHotel"
import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import FilterHotels from "@/components/global/molecules/FilterHotel"
import { useForm } from "react-hook-form"
import { SearchSchema, SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Hotel } from "@/lib/interface/hotel.interface"
import MapCustom from "@/components/global/molecules/Map"
import { Coordinates } from "@/lib/interface/coordinates.interface"
import { useDispatch } from "react-redux"
import { saveListHotel } from "@/store/slices/HotelSlice"
import { saveListPlace } from "@/store/slices/DestinationSlice"
import { saveReserveInformation } from "@/store/slices/UserSlice"

const HotelsPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | undefined>(1)
  const [dataSearch, setDataSearch] = useState<Hotel[] | null>(null)
  const [isOverlayScrollType, setIsOverlayScrollType] = useState<boolean>(false)
  const [hoverPlace, setHoverPlace] = useState<Coordinates | null>(null)
  const { scrollY } = useScroll()
  const dispatch = useDispatch()
  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 173 && isOverlayScrollType === false) {
      setIsOverlayScrollType(true)
    }
    if (current < 173 && isOverlayScrollType) {
      setIsOverlayScrollType(false)
    }
  })
  const hotelList = useQuery({
    queryKey: ["hotels", page],
    queryFn: () => filterHotels({ page }),
    placeholderData: keepPreviousData
  })
  const { mutate } = useMutation({
    mutationFn: (data: SearchSchemaType) => filterHotels({ page: 1, data }),
    onSuccess: (data) => {
      setDataSearch(data?.data)
      setPage(1)
      setTotalPages(data?.totalPages)
    }
  })

  let fromDate = new Date()
  let toDate = new Date()
  toDate.setDate(fromDate.getDate() + 1)

  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      address: "",
      date: {
        from: new Date(),
        to: toDate
      },
      quantity: {
        adult: 0,
        child: 0,
        pet: 0
      }
    }
  })
  const onSubmit = async (data: SearchSchemaType): Promise<void> => {
    mutate(data)
    console.log(data)

    dispatch(saveReserveInformation(data))
  }
  const openMap = () => {
    setIsOpenMap(true)
  }
  const handleResetData = () => {
    setDataSearch(null)
    setTotalPages(undefined)
  }

  useEffect(() => {
    if (dataSearch) {
      dispatch(saveListPlace(dataSearch))
    } else {
      dispatch(saveListHotel(hotelList?.data?.data))
    }
  }, [dataSearch, hotelList?.data?.data])

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
      <div className="flex flex-col items-center justify-center">
        <div className={cn("top-0 mx-auto my-2 flex w-2/3 items-center justify-center ")}>
          <DayPickerProvider
            initialProps={{
              selected: new Date(),
              numberOfMonths: 2
            }}
          >
            <FilterHotels form={form} onSubmit={onSubmit} isDetail={false} hotelAddress=""/>
          </DayPickerProvider>
        </div>
        {isOverlayScrollType && (
          <div
            className={cn(
              "fixed top-0 z-10 mx-auto my-2 flex w-2/3 items-center justify-center rounded-full bg-white opacity-95"
            )}
          >
            <DayPickerProvider
              initialProps={{
                selected: new Date(),
                numberOfMonths: 2
              }}
            >
              <FilterHotels form={form} onSubmit={onSubmit} isDetail={false} hotelAddress=""/>
            </DayPickerProvider>
          </div>
        )}
        <div className={cn("mx-20 mt-8 grid w-[80%] pt-2", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div className=" ">
            {dataSearch?.length === 0 ? (
              <div className="ml-24 mt-8">
                <div>Not data find</div>
                <div onClick={handleResetData} className="cursor-pointer">
                  <RotateCcw />
                </div>
              </div>
            ) : (
              <ListHotel
                setHoverPlace={setHoverPlace}
                openMap={openMap}
                isShowMap={isOpenMap}
                data={dataSearch ?? hotelList.data?.data}
                loading={hotelList.isLoading}
              />
            )}
            {hotelList.data?.totalPages && (
              <PaginationCustom
                totalPages={totalPages ?? hotelList.data?.totalPages}
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

export default HotelsPage
