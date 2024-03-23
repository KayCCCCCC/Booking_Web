import { cn } from "@/lib/utils/cn"
import { Grid, GridItem, SkeletonGrid } from "../../global/atoms/bento-grid"
import { Destination } from "@/lib/interface/destination"
interface ListDestinationProps {
  isShowMap: boolean
  data: Destination[] | null | undefined
  loading: boolean
}
const ListDestinations = ({ isShowMap, data, loading }: ListDestinationProps) => {
  console.log(loading)
  
console.log(data);

  return !loading ? (
    <Grid className={cn("mx-20", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {data?.map((item, i) => (
        <GridItem
          key={i}
          data={item}
          className={cn(
            !isShowMap && i % 4 === 0 && i !== 0 && "w-full md:col-span-2 md:row-span-1",
            !isShowMap && (i === 3 || i === 6) ? "h-full md:col-span-1 md:row-span-2" : "row-span-1",
            isShowMap && "md:col-span-1 md:row-span-1"
          )}
          classUrl={cn(
            !isShowMap && i % 4 === 0 && i !== 0 && "w-full h-4/5",
            !isShowMap && (i === 3 || i === 6) && "h-full"
          )}
        />
      ))}
    </Grid>
  ) : (
    <Grid className={cn("mx-20", isShowMap ? "grid-cols-2" : "grid-cols-4")}>
      {new Array(12).map((_, i) => (
        <SkeletonGrid
          key={i}
          className={cn(
            !isShowMap && i % 4 === 0 && i !== 0 && "w-full md:col-span-2 md:row-span-1",
            !isShowMap && (i === 3 || i === 6) ? "h-full md:col-span-1 md:row-span-2" : "row-span-1",
            isShowMap && "md:col-span-1 md:row-span-1"
          )}
          classUrl={cn(
            !isShowMap && i % 4 === 0 && i !== 0 && "w-full h-4/5",
            !isShowMap && (i === 3 || i === 6) && "h-full"
          )}
        />
      ))}
    </Grid>
  )

  // )
}
export default ListDestinations
// const Skeleton = () => (
//   <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
// )
