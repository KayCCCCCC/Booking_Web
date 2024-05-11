export interface Feature {
  id: string
  type: string
  place_type: string[]
  place_formatted: string
  relevance: number
  properties: {
    accuracy: string
    category: string
    maki: string
    landmark: boolean
    wikidata: string
    address: string
    category_match: string
  }
  text: string
  name: string
  bbox: number[]
  center: number[]
  geometry: {
    type: string
    coordinates: number[]
  }
  context: {
    id: string
    wikidata: string
    text: string
    short_code: string
  }[]
}
