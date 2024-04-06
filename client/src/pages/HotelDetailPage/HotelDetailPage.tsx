import HotelDetails from "@/components/local/HotelDetail/HotelDetail"
import ListRoom from "@/components/local/HotelDetail/ListRoom"
import { Hotel } from "@/lib/interface/hotel.interface"
import { useLocation } from "react-router-dom"

const HotelDetailPage = () => {
  const hotel = useLocation().state as Hotel
  console.log(hotel)

  return (
    <div className="flex items-center justify-center gap-x-6 gap-y-8 py-4">
      <HotelDetails hotel={hotel} />
      <ListRoom />
    </div>
  )
}

export default HotelDetailPage
