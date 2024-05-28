import AlertReservation from "@/components/global/molecules/AlertReservation"
import FormReserve from "@/components/local/HotelDetail/FormReserve"
import HotelDetails from "@/components/local/HotelDetail/HotelDetail"
import { Hotel } from "@/lib/interface/hotel.interface"
import { getAllRoomOfHotelById } from "@/lib/services/HotelServices"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const HotelDetailPage = () => {
  const hotel = useLocation().state as Hotel
  const [isValid, setIsValid] = useState<boolean>(false)
  const checkValid = () => {
    setIsValid(true)
  }
  const hotelId = hotel.hotelId
  const hotelDetail = useQuery({
    queryKey: [`hotel-detail-${hotel.hotelId}`],
    queryFn: () => getAllRoomOfHotelById({ hotelId })
  })

  return (
    <div className="flex items-center justify-center gap-x-6 gap-y-8 py-4">
      <HotelDetails hotel={hotel} roomDetail={hotelDetail.data?.data ?? []} />
      <FormReserve hotelAddress={hotel.model.address} checkValid={checkValid} />

      {isValid && <AlertReservation roomDetail={hotelDetail.data?.data ?? []}/>}
    </div>
  )
}

export default HotelDetailPage
