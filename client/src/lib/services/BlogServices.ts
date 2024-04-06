import { Blog } from "../interface/blog.interface"
import { get } from "./RootServices"

interface responseBlogProps {
  blogs: Blog[]
  data: Blog[]
  success?: boolean
}

export const getAllBlog = async (): Promise<responseBlogProps> => {
  const response = await get<responseBlogProps>(`blog/get-all`)
  return response.data
}

export const getHighestRatingBlog = async (): Promise<responseBlogProps> => {
  const response = await get<responseBlogProps>(`blog/get-blogs-highest`)
  return response.data
}
