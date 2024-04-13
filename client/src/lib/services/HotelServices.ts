import { Modal } from "@/constants/Modal"
import { Hotel } from "../interface/hotel.interface"
import { get } from "./RootServices"
import { SearchSchemaType } from "../schema/Accommodation/Search.schema"

interface accommodationResponseProps {
  success: boolean
  message: string
  data: Hotel[] | null
  totalPages?: number
}
interface FilterHotelProps {
  page: number
  data?: SearchSchemaType
}
export const getHotelHighRatings = async (): Promise<accommodationResponseProps> => {
  const response = await get<accommodationResponseProps>(`model/getModelHighest?typeName=${Modal.Hotel}`)
  return response.data
}

export const getAllHotels = async ({ page }: { page: number }): Promise<accommodationResponseProps> => {
  const response = await get<accommodationResponseProps>(`model/get-all-model?page=${page}&typeName=${Modal.Hotel}`)
  return response.data
}

export const filterHotels = async ({ page, data }: FilterHotelProps): Promise<accommodationResponseProps> => {
  const address = data?.address ?? ""
  const dateFrom = data?.date.from.toISOString() ?? ""
  const dateTo = data?.date.to.toISOString() ?? ""

  const response = await get<accommodationResponseProps>(
    `model/filter-hotel?page=${page}&address=${address}&checkInDate=${dateFrom}&checkOutDate=${dateTo}`
  )
  return response.data
}
interface getNearlyHotelProps {
  address: string
  distance?: number
}
export const getNearlyHotel = async ({ address, distance }: getNearlyHotelProps) => {
  const response = await get<accommodationResponseProps>(
    `model/getModelByDestinations?address=${address}&distance=${distance}&typeName=Hotel`
  )
  return response.data
}
