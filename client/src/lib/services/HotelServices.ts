import { Modal } from "@/constants/Modal"
import { Hotel } from "../interface/hotel.interface"
import { get } from "./RootServices"
import { SearchSchemaType } from "../schema/Accommodation/Search.schema"
import { HotelRoomType } from "../interface/destination.interface"

interface accommodationResponseProps {
  success: boolean
  message: string
  data: Hotel[] | null
  totalPages?: number
  listRoom?: HotelRoomType
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
  const dateFrom = data?.date.from.toLocaleDateString() ?? ""
  const dateTo = data?.date.to.toLocaleDateString() ?? ""
  console.log(dateFrom, dateTo)

  // &numberOfAdult=${data?.quantity.adult}&numberOfChildren=${data?.quantity.child}
  const response = await get<accommodationResponseProps>(
    `model/filter-hotel?page=${page}&address=${address}&checkInDate=${dateFrom}&checkOutDate=${dateTo} `
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

interface hotelRoomResponseProps {
  success: boolean
  message: string
  data: HotelRoomType[] | null
  totalPages?: number
}
interface getAllRoomOfHotelByIdProps {
  hotelId: number
}
export const getAllRoomOfHotelById = async ({ hotelId }: getAllRoomOfHotelByIdProps) => {
  const response = await get<hotelRoomResponseProps>(`range-model/get-type-model-hotel/${hotelId}`)
  return response.data
}
