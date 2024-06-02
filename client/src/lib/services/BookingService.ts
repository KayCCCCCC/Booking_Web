import { Booking } from "../interface/booking.interface"
import { post } from "./RootServices"
interface getBookingProps {
  success: number
  message: string
  booking: Booking
}

export const createBooking = async (data: Booking): Promise<getBookingProps> => {
  const response = await post<getBookingProps>("/booking/create", data)
  return response.data
}
