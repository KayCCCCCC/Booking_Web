import React, { useState } from "react"
import { Input } from "@/components/global/atoms/input"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import QuantityInput from "@/components/global/molecules/QuantityInput"

const BookingInformation = ({
  cost,
  room,
  setRoom
}: {
  cost: number
  room: number
  setRoom: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { dateFrom, dateTo, quantity } = useSelector((state: RootState) => state.user)
  const totalGuests = quantity.adult + quantity.child

  const formattedFromDate = new Date(dateFrom).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  })

  const formattedToDate = new Date(dateTo).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  })
  const date1 = new Date(dateFrom)
  const date2 = new Date(dateTo)

  const differenceInMilliseconds = Math.abs((date2 as any) - (date1 as any))
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
  const [totalCost, setTotalCost] = useState<number>(room * Math.floor(cost) * differenceInDays)
  return (
    <div className="  ">
      <h2 className="p-3 font-semibold uppercase text-rose-600">Booking information</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="">Number of guests</label>
          <Input value={totalGuests} readOnly />
        </div>
        <div>
          <label>Checkin Date - CheckOut Date</label>
          <Input value={`${formattedFromDate} - ${formattedToDate}`} readOnly />
        </div>
        <div>
          <label>Total Date</label>
          <Input value={differenceInDays} readOnly />
        </div>
        <div>
          <label>Cost per Night $</label>
          <Input value={Math.floor(cost)} readOnly />
        </div>
        <div className="pb-3">
          {/* <label>Total Room</label> */}
          <QuantityInput
            fieldName="Number of rooms"
            description="Recommend"
            value={room}
            onChange={(value) => {
              setRoom(value)
              setTotalCost(value * Math.floor(cost) * differenceInDays)
            }}
          />
        </div>
      </div>
      <div className="rounded-md bg-rose-600 p-2 text-white">
        <h2>TOTAL</h2>
        <div className="flex justify-between">
          <span>
            {differenceInDays} day(s) x {Math.floor(cost)} each Room x {room}
          </span>
          <span className="text-2xl  ">{totalCost}$</span>
        </div>
      </div>
    </div>
  )
}

export default BookingInformation
