import { Destination, DestinationType } from "../interface/destination"
import { get } from "./RootServices"

interface destinationTypeResponseProps {
  success: boolean
  message: string
  data: DestinationType[] | null
}
export const getAllDestinationType = async (): Promise<destinationTypeResponseProps> => {
  const response = await get<destinationTypeResponseProps>(`model/list-type-destination`)
  return response.data
}
interface destinationResponseProps {
  success: boolean
  message: string
  data: Destination[] | null
  totalPages?: number
}
export const getAllDestination = async ({ page }: { page: number }): Promise<destinationResponseProps> => {
  const response = await get<destinationResponseProps>(`model/get-all-destination?page=${page}`)
  return response.data
}

export const getDestinationHighRatings = async (): Promise<destinationResponseProps> => {
  const response = await get<destinationResponseProps>(`model/getDestinationHighest`)
  return response.data
}
