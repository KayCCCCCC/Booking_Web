import { Accommodation } from "../interface/accommodation"
import { get } from "./RootServices"

interface accommodationResponseProps {
  success: boolean
  message: string
  data: Accommodation[] | null
}


export const getAccommodationHighRatings = async (): Promise<accommodationResponseProps> => {
    const response = await get<accommodationResponseProps>(`model/getModelHighest`)
    return response.data
  }
  