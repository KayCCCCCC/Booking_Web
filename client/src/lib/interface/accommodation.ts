export interface Accommodation {
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
    accommodationTypeId: number
    urls: string[]
  }
  