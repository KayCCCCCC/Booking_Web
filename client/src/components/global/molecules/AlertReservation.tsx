import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "../atoms/alert"
import { useNavigate } from "react-router-dom"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { HotelRoomType } from "@/lib/interface/destination.interface"

const AlertReservation = ({ roomDetail }: { roomDetail: HotelRoomType[] | [] }) => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to reserve?</AlertDialogTitle>
          <AlertDialogDescription>The room of this hotel is available for your demand</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate(RouterEndPoint.Payment, { state: roomDetail })}>
            Reserve Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertReservation
