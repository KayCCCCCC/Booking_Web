import { cn } from "@/lib/utils/cn"
import useArrangeImage from "@/lib/utils/useArrangeImage"
import { ShowAllImage } from "./ShowAllImage"

const ImagePost = ({ urls }: { urls: string[] }) => {
  const numberOfImage: number = urls.length
  const availableImage: string[] = numberOfImage > 5 ? urls.slice(0, 5) : urls
  const isViewMore: boolean = urls.length > 4
  const length = availableImage.length

  return (
    <div className={cn("relative grid w-full grid-cols-6  gap-1 p-1")}>
      {availableImage.map((image, index) => (
        <div key={index} className={(cn("h-fit"), useArrangeImage({ length, index }))}>
          <img src={image} alt={`image-${index + 1}`} className={cn("rounded-md ")} />
        </div>
      ))}
      {isViewMore && <ShowAllImage urls={urls} />}
    </div>
  )
}

export default ImagePost
