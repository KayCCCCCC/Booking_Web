import { User } from "./user.interface"

export interface Comment {
  id: string
  text: string
  replies: Comment[]
  user: User
}
