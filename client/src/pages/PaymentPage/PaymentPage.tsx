import BookingInformation from "@/components/local/Payment/BookingInformation"
import RoomInformation from "@/components/local/Payment/RoomInformation"
import UserInformation from "@/components/local/Payment/UserInformation"
import { HotelRoomType } from "@/lib/interface/destination.interface"
import { useLocation } from "react-router-dom"

const PaymentPage = () => {
  const roomDetail = useLocation().state as HotelRoomType[]

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center gap-4">
        <div className="w-1/3 rounded-md p-4 ring-1 ring-rose-700 ">
          <UserInformation />
        </div>
        <div className="w-1/3 rounded-md p-4 ring-1 ring-rose-700">
          <RoomInformation roomDetail={roomDetail} />
        </div>
      </div>
      <div className="flex p-2 items-center justify-center gap-4">
        <div className="w-1/3 rounded-md p-4 ring-1 ring-rose-700">
          <BookingInformation cost={roomDetail[0].range_models[0].cost} />
        </div>
        <div className="bg-rose-600 text-white w-1/3 rounded-md p-6 font-semibold uppercase text-2xl justify-center text-center cursor-pointer ">Pay Now</div>
      </div>
    </div>
  )
}

export default PaymentPage
