import { getNearlyHotel } from "@/lib/services/HotelServices"
import { useQuery } from "@tanstack/react-query"

const RecommendHotel = ({ address, name }: { address: string; name: string }) => {
  const listHotelNearly = useQuery({
    queryKey: ["hotel-near", name],
    queryFn: () => getNearlyHotel({ address, distance: 3000 })
  })
  console.log(listHotelNearly.data)
  return (
    <div className="flex h-fit w-1/3 items-center p-4">
      <div>Recommend Hotels</div>
      <div>
        {/* {listHotelNearly?.data?.data?.map((hotel) => (
      <div className="flex gap-2" key={hotel.model.id}>
        <img src={hotel.model.urls[0]} alt={`hotel-${hotel.model.id}`} />
        <div>
          <span>{hotel.model.name}</span>
          <span>{hotel.pricePerNight}</span>
        </div>
      </div>
    ))} */}
      </div>
    </div>
  )
}

export default RecommendHotel
