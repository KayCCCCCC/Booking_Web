import { Star } from "lucide-react"

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div>
      <div className="flex cursor-pointer gap-1 *:hover:bg-red-600">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <Star key={index} stroke="none" style={{ backgroundColor: "transparent" }} fill="rgb(250 204 21)" />
        ))}
      </div>
      <div>{rating}</div>
    </div>
  )
}

export default Rating
