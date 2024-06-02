import BookingInformation from "@/components/local/Payment/BookingInformation"
import RoomInformation from "@/components/local/Payment/RoomInformation"
import UserInformation from "@/components/local/Payment/UserInformation"
import { HotelRoomType } from "@/lib/interface/destination.interface"
import { confirmPayment } from "@/lib/services/PaymentServices"
import { saveSessionId } from "@/store/slices/HotelSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

const PaymentPage = () => {
  const roomDetail = useLocation().state as HotelRoomType[]
  const [room, setRoom] = useState<number>(1)
  const dispatch = useDispatch()

  const handlePayment = async () => {
    const data = {
      amount: room,
      price: roomDetail[0].range_models[0].cost,
      name: roomDetail[0].name,
      description: roomDetail[0].range_models[0].description
    }

    try {
      const payment = await confirmPayment({ data })
      window.location.href = payment.data.url!
      console.log(payment.data.payment_status)
      dispatch(saveSessionId(payment.data.id))
    } catch (error) {
      console.error("Error", error)
    }
  }
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
      <div className="flex items-center justify-center gap-4 p-2">
        <div className="w-1/3 rounded-md p-4 ring-1 ring-rose-700">
          <BookingInformation cost={roomDetail[0].range_models[0].cost} room={room} setRoom={setRoom} />
        </div>
        <div
          className="w-1/3 cursor-pointer justify-center rounded-md bg-rose-600 p-6 text-center text-2xl font-semibold uppercase text-white "
          onClick={handlePayment}
        >
          Go To Pay Now
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
