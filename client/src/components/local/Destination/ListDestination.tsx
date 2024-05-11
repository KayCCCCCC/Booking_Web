import { cn } from "@/lib/utils/cn"
import { Grid, GridItem, SkeletonGrid } from "../../global/atoms/bento-grid"
import { Destination } from "@/lib/interface/destination.interface"
import { Coordinates } from "@/lib/interface/coordinates.interface"
interface ListDestinationProps {
  isShowMap: boolean
  data: Destination[] | null | undefined
  loading: boolean
  setHoverPlace: (coordinate: Coordinates) => void
  openMap: () => void
}
const ListDestinations = ({ isShowMap, data, loading, setHoverPlace, openMap }: ListDestinationProps) => {
  return !loading ? (
    <Grid className={cn("mx-20 min-h-screen", isShowMap ? " grid-cols-1 px-10" : "grid-cols-3")}>
      {data?.map((item, i) => (
        <div key={i}>
          <GridItem
            data={item}
            className={cn(isShowMap && "md:col-span-1 md:row-span-1")}
            classUrl={cn()}
            setHoverPlace={setHoverPlace}
            openMap={openMap}
          />
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
export default ListDestinations
