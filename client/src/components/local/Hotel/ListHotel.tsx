import ModalCustom from "@/components/global/molecules/HotelCustom"
import { Grid, SkeletonGrid } from "@/components/global/atoms/bento-grid"
import { Hotel } from "@/lib/interface/hotel.interface"
import { cn } from "@/lib/utils/cn"
import { Coordinates } from "@/lib/interface/coordinates.interface"

interface ListHotelProps {
  isShowMap: boolean
  data: Hotel[] | null | undefined
  loading: boolean
  setHoverPlace: (coordinate: Coordinates) => void
  openMap: () => void
}
const ListHotel = ({ isShowMap, data, loading, setHoverPlace, openMap }: ListHotelProps) => {
  return !loading ? (
    <Grid className={cn("mx-20 min-h-screen", isShowMap ? "grid-cols-1 px-10" : "grid-cols-3")}>
      {data?.map((item, i) => (
        <div key={i}>
          <ModalCustom data={item} openMap={openMap} setHoverPlace={setHoverPlace} />
        </div>
      ))}
    </Grid>
  ) : (
    <Grid className={cn("mx-20", isShowMap ? "grid-cols-1 px-10" : "grid-cols-3")}>
      {new Array(12).fill("").map((_, i) => (
        <SkeletonGrid key={i} className={cn(isShowMap && "md:col-span-1 md:row-span-1")} />
      ))}
    </Grid>
  )
}
export default ListHotel
