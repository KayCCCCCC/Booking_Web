import { cn } from "@/lib/utils/cn"
import { Grid, GridItem, SkeletonGrid } from "../../global/atoms/bento-grid"
import { Destination } from "@/lib/interface/destination.interface"
interface ListDestinationProps {
  isShowMap: boolean
  data: Destination[] | null | undefined
  loading: boolean
}
const ListDestinations = ({ isShowMap, data, loading }: ListDestinationProps) => {
  return !loading ? (
    <Grid className={cn("min-h-screen", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {data?.map((item, i) => (
        <GridItem
          key={i}
          data={item}
          className={cn(
            // !isShowMap && i % 4 === 0 && i !== 0 && "w-full md:col-span-2 md:row-span-1",
            // !isShowMap && (i === 3 || i === 6) ? "h-full md:col-span-1 md:row-span-2" : "row-span-1",
            isShowMap && "md:col-span-1 md:row-span-1"
          )}
          classUrl={
            cn()
            // !isShowMap && i % 4 === 0 && i !== 0 && "w-full h-4/5",
            // !isShowMap && (i === 3 || i === 6) && "h-full"
          }
        />
      ))}
    </Grid>
  ) : (
    <Grid className={cn("mx-20", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {new Array(12).fill("").map((_, i) => (
        <SkeletonGrid
          key={i}
          className={cn(
            // !isShowMap && i % 4 === 0 && i !== 0 && "w-full md:col-span-2 md:row-span-1",
            // !isShowMap && (i === 3 || i === 6) ? "h-full md:col-span-1 md:row-span-2" : "row-span-1",
            isShowMap && "md:col-span-1 md:row-span-1"
          )}
        />
      ))}
    </Grid>
  )
}
export default ListDestinations
