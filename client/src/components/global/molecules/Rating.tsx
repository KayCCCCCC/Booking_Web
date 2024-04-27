import { Star } from "lucide-react"

const Rating = ({ rating }: { rating: number }) => {
  const maxStar: number = 5
  const ratingRound = Math.round(rating)
  return (
    <div>
      <div className="flex cursor-pointer gap-1 *:hover:bg-red-600">
        {new Array(ratingRound).fill("").map((_, index) => (
          <Star
            key={index}
            stroke="none"
            style={{ backgroundColor: "transparent" }}
            fill="rgb(250 204 21)"
            strokeWidth={2}
          />
        ))}
        {new Array(maxStar - ratingRound).fill("").map((_, index) => (
          <Star key={index} style={{ backgroundColor: "transparent" }} fill="#F9FBFD" stroke="none" />
        ))}
      </div>
    </div>
  )
}

export default Rating
