import { APINations } from "@/contants/API"
import { Country } from "@/lib/interface/country"
import axios from "axios"

export const getNationsInTheWorld = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<{
      error: boolean
      msg: string
      data: Array<Country>
    }>(APINations)

    if (response.status === 200) {
      return response.data.data
    }
  } catch (error) {
    console.error("An error occurred while making the request", error)
    throw error
  }

  return []
}
