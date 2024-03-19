import Map from "@/components/global/molecules/Map"
import ListDestinations from "@/components/local/Destination/ListDestination"
import { cn } from "@/lib/utils/cn"
import { MapIcon, PanelRightClose } from "lucide-react"
import { useState } from "react"

const DestinationPage = () => {
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)

  return (
    <div className="">
      <div className="fixed bottom-0 right-80  z-10 mb-3 ml-4 ">
        {isOpenMap ? (
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-mainLight px-3 py-2 font-medium text-mainDark "
            onClick={() => setIsOpenMap(false)}
          >
            <div className="">Hide map</div>
            <PanelRightClose />
          </div>
        ) : (
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-mainLight px-3 py-2 font-medium text-mainDark"
            onClick={() => setIsOpenMap(true)}
          >
            <div>Show map</div>
            <MapIcon />
          </div>
        )}
      </div>
      <div>
        <div>Type List</div>
        <div className={cn("grid", isOpenMap ? "grid-cols-2" : "grid-cols-1")}>
          <div>
            <ListDestinations isShowMap={isOpenMap} />
          </div>
          <div>{isOpenMap && <Map />}</div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default DestinationPage
