import ModalCustom from "@/components/global/atoms/ModalCustom"
import { Grid, SkeletonGrid } from "@/components/global/atoms/bento-grid"
import { Accommodation } from "@/lib/interface/accommodation"
import { cn } from "@/lib/utils/cn"

interface ListAccommodationProps {
  isShowMap: boolean
  data: Accommodation[] | null | undefined
  loading: boolean
}
const ListAccommodation = ({ isShowMap, data, loading }: ListAccommodationProps) => {
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
export default ListAccommodation
