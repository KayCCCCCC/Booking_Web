import { User } from "./user.interface"

export interface Comment {
  id: number
  text: string
  replies: Comment[]
  user: User
}
