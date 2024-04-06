import { Destination, DestinationType } from "../interface/destination.interface"
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
// export const getAllDestination = async ({ page }: { page: number }): Promise<destinationResponseProps> => {
//   const response = await get<destinationResponseProps>(`model/get-all-destination?page=${page}`)
//   return response.data
// }

export const getDestinationHighRatings = async (): Promise<destinationResponseProps> => {
  const response = await get<destinationResponseProps>(`model/getDestinationHighest`)
  return response.data
}

export const filterDestinationByType = async ({
  typeName,
  page
}: {
  typeName: string
  page: number
}): Promise<destinationResponseProps> => {
  const response = await get<destinationResponseProps>(`model/filter-destination?nameType=${typeName}&page=${page}`)
  return response.data
}
