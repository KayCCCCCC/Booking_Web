import { Comment } from "../interface/comment.interface"
import { get, post } from "./RootServices"

interface CommentBlogProps {
  success: boolean
  message: string
  data: Comment[]
}

export const getCommentBlogById = async ({ id }: { id: number }): Promise<CommentBlogProps> => {
  const response = await get<CommentBlogProps>(`blog/get-comment-blog/${id}`)
  return response.data
}
interface postCommentBlogProps {
  content: string
  userId: number
  blogId: number
}
export const commentBlog = async ({ content, userId, blogId }: postCommentBlogProps) => {
  const response = await post<CommentBlogProps>("blog/comment-blog", { content, userId, blogId })
  return response.data
}
interface replyCommentBlogProps {
  content: string
  userId: number
  blogId: number
  replyCommentId: number
}

export const replyCommentBlog = async ({ content, userId, blogId, replyCommentId }: replyCommentBlogProps) => {
  const response = await post<CommentBlogProps>("blog/reply-comment-blog", { content, userId, blogId, replyCommentId })
  return response.data
}
