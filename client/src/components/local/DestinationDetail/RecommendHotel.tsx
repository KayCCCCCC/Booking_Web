import RouterEndPoint from "@/constants/RouterEndPoint"
import { getNearlyHotel } from "@/lib/services/HotelServices"
import { useQuery } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RecommendHotel = ({ address, name }: { address: string; name: string }) => {
  const listHotelNearly = useQuery({
    queryKey: ["hotel-near", name],
    queryFn: () => getNearlyHotel({ address, distance: 3000 })
  })
  const hotelCanShow =
    listHotelNearly?.data?.data && listHotelNearly?.data?.data?.length > 3
      ? listHotelNearly?.data?.data?.slice(0, 3)
      : listHotelNearly?.data?.data
  const navigate = useNavigate()
  return (
    <div className="flex h-fit w-1/3 flex-col  gap-4 rounded-md bg-slate-50/90 p-4 pb-8">
      <div className="text-2xl font-medium ">Recommend Hotels</div>
      <div className="flex flex-col gap-6 items-center justify-center">
        {hotelCanShow?.map((hotel) => (
          <div className=" relative flex w-[26rem] rounded" key={hotel.model.id}>
            <img
              src={hotel.model.urls[0]}
              alt={`hotel-${hotel.model.id}`}
              className=" h-40 w-[20rem] rounded-md object-cover"
            />
            <div>
              <div className="z-1 absolute left-0 top-0 m-2 flex gap-1 rounded-lg bg-slate-50/20 px-2 py-1 backdrop-blur-sm">
                <Star size={20} color="rgb(250 204 21)" fill="rgb(250 204 21)" />
                <span>{hotel.model.rate}</span>
              </div>
              <div
                className="bottom-1 flex h-full cursor-pointer flex-col items-center justify-center rounded-r-md bg-white px-2 py-1 hover:translate-x-1 "
                onClick={() => navigate(`${RouterEndPoint.Stays}/${hotel.model.name}`, { state: hotel })}
              >
                <span className="truncate font-medium">{hotel.model.name}</span>
                {/* <span className="line-clamp-3 w-[8rem] truncate ">{hotel.model.description}</span> */}
                <div className="truncate">From {hotel.pricePerNight} $ night</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendHotel
