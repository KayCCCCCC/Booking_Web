import { BASE_MAP_URL, MAP_API_KEY } from "@/constants/API"
import { get } from "./RootServices"
import { Feature } from "../interface/feature.map.interface"
interface searchAddressResponse {
  type: string
  query: string[]
  suggestions: Feature[]
  attribution: string
}

export const searchAddress = async ({ searchText }: { searchText: string }): Promise<searchAddressResponse> => {
  const response = await get<searchAddressResponse>(
    `${BASE_MAP_URL}?q=${searchText}?language=en&limit=4&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&country=US&access_token=${MAP_API_KEY}`
  )

  console.log(response)

  return response.data
}
