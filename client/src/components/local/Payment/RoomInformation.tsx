import { Input } from "@/components/global/atoms/input"
import { HotelRoomType } from "@/lib/interface/destination.interface"

const RoomInformation = ({ roomDetail }: { roomDetail: HotelRoomType[] | [] }) => {
  return (
    <div>
      <h2 className="text-rose-600 uppercase font-semibold p-3"> Room Information</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="">Hotel Name</label>
          <Input value={roomDetail[0].name} />
        </div>
        <div>
          <label htmlFor="">Hotel Address</label>
          <Input value={roomDetail[0].address} />
        </div>
        <div>
          <label htmlFor="">Room Description</label>
          <Input value={roomDetail[0].range_models[0].description} />
        </div>
      </div>
    </div>
  )
}

export default RoomInformation
