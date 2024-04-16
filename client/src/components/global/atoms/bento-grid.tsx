import { Destination } from "@/lib/interface/destination.interface"
import { cn } from "@/lib/utils/cn"
import { Skeleton } from "./skeleton"
import { useNavigate } from "react-router-dom"
import RouterEndPoint from "@/constants/RouterEndPoint"

export const Grid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={cn("mx-auto grid gap-4 md:auto-rows-[20rem] ", className)}>{children}</div>
}

export const GridItem = ({
  className,
  classUrl,
  data
}: {
  className?: string
  classUrl: string
  data: Destination
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${RouterEndPoint.Destinations}/${data.name}`, { state: data })
  }
  return (
    <div
      className={cn(
        className,
        "shadow-input group flex flex-col justify-between space-y-2 rounded-xl border border-gray-100  bg-white p-4  transition duration-200 hover:border-transparent hover:shadow-xl dark:border-slate-900   dark:bg-slate-800 dark:shadow-none"
      )}
    >
      <img src={data.urls[0]} alt="img" className={cn("w-full rounded-md object-cover", classUrl)} />
      <div className="cursor-pointer transition duration-200 group-hover:translate-x-2" onClick={handleClick}>
        <div className="z-0 my-1 font-bold text-neutral-600 dark:text-neutral-200">{data.name}</div>
        <div className="z-0 truncate text-xs text-neutral-600 dark:text-neutral-200">{data.address}</div>
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
