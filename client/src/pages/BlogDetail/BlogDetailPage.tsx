import Timer from "@/components/global/molecules/Timer"
import UserAvatar from "@/components/global/molecules/UserAvatar"
import CommentBlog from "@/components/local/BlogDetail/CommentBlog"
import { Blog } from "@/lib/interface/blog.interface"
import { useLocation } from "react-router-dom"

const BlogDetailPage = () => {
  const blog = useLocation().state as Blog

  return (
    <div className="my-10 flex gap-20 px-48">
      <div className="flex w-2/3 flex-col gap-4 ">
        <div className="space-x-2 text-4xl font-medium">{blog.title}</div>
        <div className="flex items-center gap-2 ">
          <div className="col-span-1 flex items-center gap-2  text-slate-600">
            <UserAvatar url={blog.user.avatar} size="large" />
            <span className="w-40 truncate">{blog.user.name}</span>
          </div>
          <div className="truncate text-base  text-slate-900">
            <Timer time={new Date(blog.createdAt).toLocaleString()} />
          </div>
        </div>
        <img src={blog.thumbnail} alt="url" className="h-[32rem] w-full rounded-sm object-cover" />
        <div>{blog.content}</div>
      </div>
      <div className="w-1/3">
        <CommentBlog id={blog.id} />
      </div>
    </div>
  )
}

export default BlogDetailPage
