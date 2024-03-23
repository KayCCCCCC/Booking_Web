import { Destination } from "@/lib/interface/destination"
import { cn } from "@/lib/utils/cn"
import { Skeleton } from "./skeleton"

export const Grid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={cn("mx-auto grid gap-2 md:auto-rows-[20rem] ", className)}>{children}</div>
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
  return (
    <div
      className={cn(
        className,
        "group shadow-input flex flex-col justify-between space-y-2 rounded-xl border border-gray-100 bg-white p-4 transition duration-200 hover:border-transparent hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
      )}
    >
      <img src={data.urls[0]} alt="img" className={cn("w-full object-cover", classUrl)} />
      <div className="transition duration-200 group-hover:translate-x-2">
        <div className="my-1 font-bold text-neutral-600 dark:text-neutral-200">{data.name}</div>
        <div className="truncate text-xs text-neutral-600 dark:text-neutral-200">{data.address}</div>
      </div>
    </div>
  )
}
export const SkeletonGrid = ({ className, classUrl }: { className: string; classUrl: string }) => {
  console.log(1111111);
   
  return <div
    className={cn(
      className,
      "group shadow-input flex flex-col justify-between space-y-2 rounded-xl border border-gray-100 bg-white p-4 transition duration-200 hover:border-transparent hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
    )}
  >
    <Skeleton className={cn("w-full object-cover", classUrl)}>hi</Skeleton>
    <div className="transition duration-200 group-hover:translate-x-2">
      <Skeleton className="my-1 font-bold text-neutral-600 dark:text-neutral-200"></Skeleton>
      <Skeleton className="truncate text-xs text-neutral-600  dark:text-neutral-200"></Skeleton>
    </div>
  </div>
}
