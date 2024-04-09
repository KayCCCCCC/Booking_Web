import { Button } from "@/components/global/atoms/button"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { getDestinationHighRatings } from "@/lib/services/DestinationServices"
import { cn } from "@/lib/utils/cn"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Location = () => {
  const navigate = useNavigate()
  const highLocations = useQuery({
    queryKey: ["best-location"],
    queryFn: getDestinationHighRatings
  })

  if (!highLocations.data?.data) return null

  return (
    <div className="flex w-full flex-col gap-3 ">
      <div className="flex flex-col gap-1">
        <div>Best destination</div>
        <div className=" text-4xl font-semibold uppercase tracking-wider">around the world</div>
      </div>
      <div className="mx-auto grid w-full grid-cols-3 gap-6 md:auto-rows-[18rem] ">
        {highLocations.data.data.map((location, index) => (
          <div
            className={cn(
              "relative rounded-md md:col-span-1 md:row-span-1  ",
              index === 0 && "md:row-span-2",
              index === 3 && "md:col-span-2"
            )}
            key={index}
          >
            <img
              loading="lazy"
              src={location.urls[0]}
              alt="image"
              className={cn("rounded-md object-cover  ", index === 3 ? "h-[18rem] w-full" : "h-full w-full")}
            />
            <div className="absolute bottom-0 z-10 w-full">
              <div
                className="  bg-blur-[2px] m-3 cursor-pointer rounded-md  bg-slate-50/20 p-4 text-white hover:-translate-y-1"
                onClick={() => navigate(`${RouterEndPoint.Destinations}/${location.name}`, { state: location })}
              >
                <div className="truncate text-ellipsis">{location.address}</div>
                <div className="font-medium">{location.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center pt-3">
        <Button
          className="w-fit rounded-lg border border-stone-200 bg-transparent px-3 hover:bg-slate-100"
          onClick={() => navigate(`${RouterEndPoint.Destinations}`)}
        >
          View more
        </Button>
      </div>
    </div>
  )
}

export default Location
