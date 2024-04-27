import ImagePost from "@/components/global/molecules/ImagePost"
import Rating from "@/components/global/molecules/Rating"
import { Hotel } from "@/lib/interface/hotel.interface"
import { Mail, User } from "lucide-react"

const HotelDetails = ({ hotel }: { hotel: Hotel }) => {
  console.log(hotel)

  return (
    <div className="flex flex-col gap-4 rounded-lg   p-6 md:w-3/5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col px-2">
          <div className="text-4xl font-medium">{hotel.model.name}</div>
          <div>{hotel.model.address}</div>
        </div>
        <div className="flex flex-col justify-end">
          <Rating rating={hotel.model.rate} />
          <span className="flex justify-end">{hotel.model.numberRate} reviewers</span>
        </div>
      </div>

      <ImagePost urls={hotel.model.urls} />

      <div className="text-ellipsis">{hotel.model.description}</div>

      <div className=" divide-y-2 divide-gray-900 *:py-4">
        <div>
          <span>Amenities:</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Your host</span>
          <div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{hotel.contactPerson}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>{hotel.contactEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetails
