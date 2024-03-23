export interface Destination {
  name: string
  description: string
  address: string
  longitude: number
  latitude: number
  rate: number
  numberRate: number
  address_location: {
    type: string
    coordinates: number[]
  }
  destinationTypeId: number
  urls: string[]
}

export interface DestinationType {
  typeName: string
}
