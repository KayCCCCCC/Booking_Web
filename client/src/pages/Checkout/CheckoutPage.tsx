import { Booking } from "@/lib/interface/booking.interface"
import { createBooking } from "@/lib/services/BookingService"
import { checkSuccessPayment } from "@/lib/services/PaymentServices"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const CheckoutPage = () => {
  const { sessionId } = useSelector((state: RootState) => state.hotel)
  const { hotelDetail } = useSelector((state: RootState) => state.hotel)
  const { dateFrom, dateTo, paymentNumber, paymentTotal } = useSelector((state: RootState) => state.user)
  const { user } = useSelector((state: RootState) => state.auth)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const data: Booking = {
    startDate: dateFrom,
    expireDate: dateTo,
    userId: user.id,
    itemId: hotelDetail as number,
    quantity: paymentNumber,
    total: paymentTotal
  }

  useEffect(() => {
    const paymentFn = async () => {
      const payment = await checkSuccessPayment(sessionId)
      if (payment?.success) {
        setIsSuccess(true)
        await createBooking(data)
      } else {
        setIsSuccess(false)
      }
    }
    paymentFn()
  }, [])

  return isSuccess ? (
    <div>Transation successfully!</div>
  ) : (
    <div>Something wrong in transaction, please contact us to solve the problem</div>
  )
}

export default CheckoutPage
