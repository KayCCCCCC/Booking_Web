import ModalCustom from "@/components/global/molecules/HotelCustom"
import { Grid, SkeletonGrid } from "@/components/global/atoms/bento-grid"
import { Hotel } from "@/lib/interface/hotel.interface"
import { cn } from "@/lib/utils/cn"

interface ListHotelProps {
  isShowMap: boolean
  data: Hotel[] | null | undefined
  loading: boolean
}
const ListHotel = ({ isShowMap, data, loading }: ListHotelProps) => {
  return !loading ? (
    <Grid className={cn("", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {data?.map((item, i) => (
        <div key={i}>
          <ModalCustom data={item} />
        </div>
      ))}
    </Grid>
  ) : (
    <Grid className={cn("mx-20", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {new Array(12).fill("").map((_, i) => (
        <SkeletonGrid key={i} className={cn(isShowMap && "md:col-span-1 md:row-span-1")} />
      ))}
    </Grid>
  )
}
export default ListHotel
