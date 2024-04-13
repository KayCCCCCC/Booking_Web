import ModalCustom from "@/components/global/molecules/HotelCustom"
import { Button } from "@/components/global/atoms/button"
import { getHotelHighRatings } from "@/lib/services/HotelServices"
import { useQuery } from "@tanstack/react-query"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { useNavigate } from "react-router-dom"

const Modal = () => {
  const navigate = useNavigate()
  const highHotels = useQuery({
    queryKey: ["best-hotel"],
    queryFn: getHotelHighRatings
  })

  if (!highHotels.data?.data) return null

  return (
    <>
      <div className="grid w-full grid-cols-3 items-center gap-6  ">
        <div className="grid grid-cols-2 items-center  gap-6 md:col-span-2 md:auto-rows-[20rem]">
          {highHotels.data.data.map((acc, index) => (
            <div key={index}>
              <ModalCustom data={acc} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-1 text-right md:row-span-2 md:mr-20">
          <div>Top Hotel</div>
          <div className="text-4xl font-semibold uppercase leading-normal tracking-wider">
            superior quality services
          </div>
          <div className="mt-2">
            <Button
              className="w-fit rounded-lg border border-stone-200 bg-transparent px-3 hover:bg-slate-100 "
              onClick={() => navigate(`${RouterEndPoint.Stays}`)}
            >
              View more
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
