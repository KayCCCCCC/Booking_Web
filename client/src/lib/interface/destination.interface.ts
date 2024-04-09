export interface Destination {
  id: string
  name: string
  description: string
  address: string
  longitude: number
  latitude: number
  rate: number
  numberRate: number
  address_location: string
  typeName: string
  urls: string[]
}

export interface DestinationType {
  typeName: string
}
