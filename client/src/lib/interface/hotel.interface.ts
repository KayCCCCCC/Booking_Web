import { Modal } from "./modal.interface"

export interface Hotel {
  model: Modal
  checkInDate: string
  checkOutDate: string
  amenities: string
  numberOfRooms: number
  numberOfGuestsPerRoom: number
  pricePerNight: number
  bookingStatus: string
  contactPerson: string
  contactEmail: string
}
