import { User } from "./user.interface"

export interface Blog {
  id: string
  title: string
  thumbnail: string
  description: string
  content: string
  createdAt: string
  avgRating: number
  tags: string[]
  user: User
}
