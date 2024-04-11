import { Blog } from "../interface/blog.interface"
import { get } from "./RootServices"

interface responseBlogProps {
  blogs: Blog[]
  data: Blog[]
  success?: boolean
  totalPages: number
}

export const getAllBlog = async ({ page }: { page: number }): Promise<responseBlogProps> => {
  const response = await get<responseBlogProps>(`blog/get-all?page=${page}`)
  return response.data
}

export const getHighestRatingBlog = async (): Promise<responseBlogProps> => {
  const response = await get<responseBlogProps>(`blog/get-blogs-highest`)
  return response.data
}
