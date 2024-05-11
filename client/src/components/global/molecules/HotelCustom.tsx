import RouterEndPoint from "@/constants/RouterEndPoint"
import { Coordinates } from "@/lib/interface/coordinates.interface"
import { Hotel } from "@/lib/interface/hotel.interface"
import { cn } from "@/lib/utils/cn"
import { EyeIcon, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../atoms/tooltip"
interface ModalCustomProps {
  data: Hotel
  setHoverPlace: (coordinate: Coordinates) => void
  openMap: () => void
  isHome?: boolean
}

const HotelCustom = ({ data, setHoverPlace, openMap, isHome }: ModalCustomProps) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`${RouterEndPoint.Stays}/${data.model.name}`, { state: data })
  }
  const onSelectPlace = () => {
    const LngLat = data.model.address_location.split(",")
    setHoverPlace({ lng: Number(LngLat[0]!), lat: Number(LngLat[1]!) })
    openMap()
  }

  return (
    <div className={cn("relative md:col-span-1 md:row-span-1")}>
      <img src={data.model.urls[0]} alt="" className={cn("h-[16rem] w-full rounded-md object-cover")} loading="lazy" />
      {!isHome && (
        <div onClick={onSelectPlace} className="absolute bottom-24 right-6 z-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <EyeIcon color="red" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Show on map</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div className="z-1 absolute bottom-0 w-full cursor-pointer" onClick={handleNavigate}>
        <div className="m-3 rounded-md  bg-slate-50/20 p-3 text-white backdrop-blur-[2px] hover:-translate-y-1">
          <div className="truncate text-ellipsis">{data.model.address}</div>
          <div>{data.model.name}</div>
        </div>
      </div>

      <div className="z-1 absolute right-0 top-0 m-2 flex gap-1 rounded-lg bg-slate-50/20 px-2 py-1 backdrop-blur-sm">
        <Star size={20} color="rgb(250 204 21)" fill="rgb(250 204 21)" />
        <span>{data.model.rate}</span>
      </div>
    </div>
  )
}

HotelCustom.defaultProps = {
  setHoverPlace: () => {},
  openMap: () => {},
  isHome: false
}
export default HotelCustom
