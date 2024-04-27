import UserAvatar from "@/components/global/molecules/UserAvatar"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { Blog } from "@/lib/interface/blog.interface"
import { cn } from "@/lib/utils/cn"
import { useNavigate } from "react-router-dom"

const ListBlog = ({ blogs, latestBlog }: { blogs: Blog[]; latestBlog: Blog | null }) => {
  const navigate = useNavigate()
  return (
    <div className="mx-20">
      <div className="grid grid-cols-3 gap-6 md:auto-rows-[27rem]">
        {blogs.map((blog, index) => (
          <div
            className={cn(
              "col-span-1 flex flex-col gap-2 rounded-md border border-slate-300 p-3 hover:shadow-md",
              latestBlog?.id === blog?.id && "col-span-3 row-span-1 flex flex-row  gap-4"
            )}
            key={index}
          >
            <img
              src={blog.thumbnail}
              alt={`${blog.title}-${index}`}
              className={cn("h-60 w-full rounded-md object-cover", latestBlog?.id === blog?.id && "h-full w-2/3 ")}
            />
            <div
              className={cn(
                "flex cursor-pointer flex-col gap-2 hover:translate-x-1 ",
                latestBlog?.id === blog?.id && "w-1/3"
              )}
              onClick={() => navigate(`${RouterEndPoint.Blogs}/${blog?.title}`, { state: blog })}
            >
              <div className="line-clamp-2 min-h-12 text-ellipsis font-semibold">{blog.title}</div>
              <div
                className={cn(
                  "line-clamp-3  justify-end overflow-hidden text-ellipsis text-sm text-slate-400/90",
                  latestBlog?.id === blog?.id && "line-clamp-10"
                )}
              >
                {blog.content}
              </div>
              <div className="items-center gap-2 md:grid md:grid-cols-2">
                <div className="col-span-1 flex items-center gap-2 text-sm text-slate-600">
                  <UserAvatar url={blog.user.avatar} />
                  <span className="truncate">{blog.user.name}</span>
                </div>
                <div className="truncate text-[0.8rem] text-slate-500/80">
                  {new Date(blog.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListBlog
