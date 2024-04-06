import UserAvatar from "@/components/global/molecules/UserAvatar"
import CommentBlog from "@/components/local/BlogDetail/CommentBlog"
import { Blog } from "@/lib/interface/blog.interface"
import { useLocation } from "react-router-dom"

const BlogDetailPage = () => {
  const blog = useLocation().state as Blog

  return (
    <div className="my-10 px-48">
      <div className="flex flex-col gap-4">
        <div className="text-4xl space-x-2 font-medium">{blog.title}</div>
        <div className="items-center gap-2 flex ">
          <div className="col-span-1 flex items-center gap-2  text-slate-600">
            <UserAvatar url={blog.user.avatar} size="large"/>
            <span className="truncate w-40">{blog.user.name}</span>
          </div>
          <div className="truncate text-base  text-slate-900">{new Date(blog.createdAt).toLocaleString()}</div>
        </div>
        <img src={blog.thumbnail} alt="url" className="h-[40rem] w-full rounded-sm object-cover" />
        <div>{blog.content}</div>
      </div>
      <div>
        <CommentBlog id={blog.id} />
      </div>
    </div>
  )
}

export default BlogDetailPage
