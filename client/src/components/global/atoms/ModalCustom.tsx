import { Accommodation } from "@/lib/interface/accommodation"
import { Destination } from "@/lib/interface/destination"
import { cn } from "@/lib/utils/cn"
import { Star } from "lucide-react"
interface ModalCustomProps {
  data: Accommodation
}

const ModalCustom = ({ data }: ModalCustomProps) => {
  return (
    <div className={cn("relative md:col-span-1 md:row-span-1")}>
      <img src={data.urls[0]} alt="" className={cn("h-[19rem] w-full rounded-md object-cover")} />
      <div className="absolute bottom-0 z-1 w-full">
        <div className="m-3 rounded-md  bg-slate-50/20 p-3 text-white backdrop-blur-[2px] hover:-translate-y-1">
          <div className="truncate text-ellipsis">{data.address}</div>
          <div>{data.name}</div>
        </div>
      </div>

      <div className="absolute right-0 top-0 z-1 m-2 flex gap-1 rounded-lg bg-slate-50/20 px-2 py-1 backdrop-blur-sm">
        <Star size={20} color="rgb(250 204 21)" fill="rgb(250 204 21)" />
        <span>{data.rate}</span>
      </div>
    </div>
  )
}

export default ModalCustom
