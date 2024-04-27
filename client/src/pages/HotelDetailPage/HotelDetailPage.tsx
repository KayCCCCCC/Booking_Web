import FormReserve from "@/components/local/HotelDetail/FormReserve"
import HotelDetails from "@/components/local/HotelDetail/HotelDetail"
import { Hotel } from "@/lib/interface/hotel.interface"
import { useLocation } from "react-router-dom"

const HotelDetailPage = () => {
  const hotel = useLocation().state as Hotel

  return (
    <div className="flex items-center justify-center gap-x-6 gap-y-8 py-4">
      <HotelDetails hotel={hotel} />
      <FormReserve />
    </div>
  )
}

export default HotelDetailPage
