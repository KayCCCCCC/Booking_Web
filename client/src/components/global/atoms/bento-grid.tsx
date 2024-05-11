import { Destination } from "@/lib/interface/destination.interface"
import { cn } from "@/lib/utils/cn"
import { Skeleton } from "./skeleton"
import { useNavigate } from "react-router-dom"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { EyeIcon } from "lucide-react"
import { Coordinates } from "@/lib/interface/coordinates.interface"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export const Grid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={cn("mx-auto mt-6 grid gap-x-4 gap-y-6 ", className)}>{children}</div>
}

export const GridItem = ({
  className,
  classUrl,
  data,
  setHoverPlace,
  openMap
}: {
  className?: string
  classUrl: string
  data: Destination
  setHoverPlace: (coordinate: Coordinates) => void
  openMap: () => void
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${RouterEndPoint.Destinations}/${data.name}`, { state: data })
  }
  return (
    <div
      className={cn(
        className,
        "shadow-input group relative flex h-[26rem] flex-col justify-between space-y-2 rounded-xl border border-gray-100  bg-white p-4  transition duration-200 hover:border-transparent hover:shadow-red   dark:border-slate-900   dark:bg-slate-800 dark:shadow-none"
      )}
    >
      <img src={data.urls[0]} alt="img" className={cn("relative h-[80%] w-full rounded-md object-cover", classUrl)} />
      <div
        onClick={() => {
          setHoverPlace({ lng: data.longitude, lat: data.latitude })
          openMap()
        }}
        className="absolute bottom-24 right-6 z-0"
      >
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
      <div
        className="z-0 my-1 transition duration-200 first-line:cursor-pointer group-hover:translate-x-2"
        onClick={handleClick}
      >
        <div className=" truncate font-medium dark:text-neutral-200">{data.name}</div>
        <div className="max-w-60 truncate text-sm"> {data.typeName}</div>
        <div className=" truncate text-sm dark:text-neutral-200">{data.address}</div>
      </div>
    </div>
  )
}
export const SkeletonGrid = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        className,
        "shadow-input group flex flex-col justify-between space-y-2 rounded-xl border border-gray-100 bg-white p-4 transition duration-200 hover:border-transparent hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
      )}
    >
      <Skeleton className={cn("h-4/5 w-full object-cover")}></Skeleton>
      <div className="transition duration-200 group-hover:translate-x-2">
        <Skeleton className="my-1 h-6 w-1/2 font-bold"></Skeleton>
        <Skeleton className=" mt-2 h-4 w-full pt-2"></Skeleton>
      </div>
    </div>
  )
}
