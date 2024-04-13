import RouterEndPoint from "@/constants/RouterEndPoint"
import { Hotel } from "@/lib/interface/hotel.interface"
import { cn } from "@/lib/utils/cn"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
interface ModalCustomProps {
  data: Hotel
}

const HotelCustom = ({ data }: ModalCustomProps) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`${RouterEndPoint.Stays}/${data.model.name}`, { state: data })
  }
  return (
    <div className={cn("relative md:col-span-1 md:row-span-1")}>
      <img src={data.model.urls[0]} alt="" className={cn("h-[19rem] w-full rounded-md object-cover")} loading="lazy" />
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

export default HotelCustom
