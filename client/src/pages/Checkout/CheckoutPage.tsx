import { createBooking } from "@/lib/services/BookingService"
import { checkSuccessPayment } from "@/lib/services/PaymentServices"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const CheckoutPage = () => {
  const { sessionId } = useSelector((state: RootState) => state.hotel)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  console.log(sessionId)

  useEffect(() => {
    const paymentFn = async () => {
      const payment = await checkSuccessPayment(sessionId)
      if (payment?.success) {
        setIsSuccess(true)
        // await createBooking(data)
      } else {
        setIsSuccess(false)
      }
      console.log(payment)
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
