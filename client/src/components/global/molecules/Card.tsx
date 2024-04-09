import { Destination } from "@/lib/interface/destination.interface"
import { cn } from "@/lib/utils/cn"
import { Heart } from "lucide-react"
interface CardProps {
  classContent: string
  item: Destination
}
const Card = ({ classContent, item }: CardProps) => {
  return (
    <div className={cn("relative", classContent)}>
      <img src={item.urls[0]} />
      <div className="absolute">
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>
          <Heart />
        </div>
      </div>
    </div>
  )
}

export default Card
