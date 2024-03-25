import { Button } from "@/components/global/atoms/button"
import { getAccommodationHighRatings } from "@/lib/services/AccommodationServices"
import { cn } from "@/lib/utils/cn"
import { useQuery } from "@tanstack/react-query"
import { Star } from "lucide-react"

const Modal = () => {
  const highAccommodations = useQuery({
    queryKey: ["best-accommodation"],
    queryFn: getAccommodationHighRatings
  })

  if (!highAccommodations.data?.data) return null
  return (
    <>
      <div className="grid w-full grid-cols-3 items-center gap-6  ">
        <div className="grid grid-cols-2 items-center  gap-6 md:col-span-2 md:auto-rows-[20rem]">
          {highAccommodations.data.data.slice(0, 4).map((acc, index) => (
            <div className={cn("relative md:col-span-1 md:row-span-1")} key={index}>
              <img src={acc.urls[0]} alt="" className={cn("h-[19rem] w-full rounded-md object-cover")} />
              <div className="absolute bottom-0 z-10 w-full">
                <div className="m-3 rounded-md  bg-slate-50/20 p-3 text-white backdrop-blur-[2px] hover:-translate-y-1">
                  <div className="truncate text-ellipsis">{acc.address}</div>
                  <div>{acc.name}</div>
                </div>
              </div>

              <div className="absolute right-0 top-0 z-10 m-2 flex gap-1 rounded-lg bg-slate-50/20 px-2 py-1 backdrop-blur-sm">
                <Star size={20} color="rgb(250 204 21)" fill="rgb(250 204 21)" />
                <span>{acc.rate}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-1 text-right md:row-span-2 md:mr-20">
          <div>Top accommodation</div>
          <div className="text-4xl font-semibold uppercase leading-normal tracking-wider">
            superior quality services
          </div>
          <div className="mt-2">
            <Button className="w-fit rounded-lg border border-stone-200 bg-transparent px-3 hover:bg-slate-100 ">
              View more
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
