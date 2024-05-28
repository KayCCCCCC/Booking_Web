import FilterHotels from "@/components/global/molecules/FilterHotel"
import { SearchSchema, SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"
import { filterHotels } from "@/lib/services/HotelServices"
import { cn } from "@/lib/utils/cn"
import { saveReserveInformation } from "@/store/slices/UserSlice"
import { RootState } from "@/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { DayPickerProvider } from "react-day-picker"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

const FormReserve = ({ hotelAddress, checkValid }: { hotelAddress: string; checkValid: () => void }) => {
  const { dateFrom, dateTo, quantity, address } = useSelector((state: RootState) => state.user)

  let fromDate = new Date()
  let toDate = new Date()
  toDate.setDate(fromDate.getDate() + 1)
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      address: address,
      date: {
        from: new Date(dateFrom) ?? fromDate,
        to: new Date(dateTo) ?? toDate
      },
      quantity: {
        adult: quantity.adult === 0 ? 1 : quantity.adult,
        child: quantity.child,
        pet: 0
      }
    }
  })

  const dispatch = useDispatch()
  const onSubmit = async (data: SearchSchemaType): Promise<void> => {
    const hotelRes = await filterHotels({ page: 1, data })
    if (hotelRes?.data != null && hotelRes.data.length > 0) {
      checkValid()
    }
    dispatch(saveReserveInformation(data))
  }
  return (
    <div className={cn("")}>
      <DayPickerProvider
        initialProps={{
          selected: new Date(),
          numberOfMonths: 2
        }}
      >
        <FilterHotels form={form} onSubmit={onSubmit} isDetail hotelAddress={hotelAddress} />
      </DayPickerProvider>
    </div>
  )
}

export default FormReserve
