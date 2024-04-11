import { useLocation } from "react-router-dom"
import { Destination } from "@/lib/interface/destination.interface"
import RecommendHotel from "@/components/local/DestinationDetail/RecommendHotel"
import LocationDetail from "@/components/local/DestinationDetail/LocationDetail"

const DestinationDetailPage = () => {
  const location = useLocation().state as Destination

  return (
    <div className="flex   justify-center gap-x-6 gap-y-8 py-4">
      <LocationDetail location={location} />
      <RecommendHotel name={location.name} address={location.address} />
    </div>
  )
}

export default DestinationDetailPage
