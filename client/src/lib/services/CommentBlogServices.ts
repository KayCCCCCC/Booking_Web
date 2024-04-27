import { Comment } from "../interface/comment.interface"
import { get } from "./RootServices"

interface CommentBlogProps {
  success: boolean
  message: string
  data: Comment[]
}

export const getCommentBlogById = async ({ id }: { id: string }): Promise<CommentBlogProps> => {
  const response = await get<CommentBlogProps>(`blog/get-comment-blog/${id}`)
  return response.data
}
