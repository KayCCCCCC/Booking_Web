import ImagePost from "@/components/global/molecules/ImagePost"
import { Destination } from "@/lib/interface/destination.interface"
import { Heart } from "lucide-react"

const LocationDetail = ({ location }: { location: Destination }) => {
  return (
    <div className="flex w-1/2 flex-col gap-4 rounded-lg bg-slate-50/90 p-6">
      <div className="flex justify-between">
        <div className="flex max-w-[60%] flex-col  truncate">
          <div className="text-2xl font-medium ">{location.name}</div>
          <div className=" items-center font-light"> {location.typeName}</div>
        </div>
        <div className="flex cursor-pointer items-center gap-2">
          <Heart />
          <span>Favorite</span>
        </div>
      </div>
      <ImagePost urls={location.urls} />
      <div className="text-lg font-medium">{location.address}</div>
      <div className="">{location.description}</div>
    </div>
  )
}

export default LocationDetail
