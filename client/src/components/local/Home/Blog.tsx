import { Button } from "@/components/global/atoms/button"
import RouterEndPoint from "@/constants/RouterEndPoint"
import { getHighestRatingBlog } from "@/lib/services/BlogServices"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Blog = () => {
  const navigate = useNavigate()
  const blogHighestRating = useQuery({
    queryKey: ["blogs-high-rating"],
    queryFn: getHighestRatingBlog
  })

  return (
    <div className="grid w-full grid-cols-4 items-center gap-8">
      <div className="flex flex-col gap-1 md:col-span-1">
        <div>Our blogs</div>
        <div className="text-4xl font-semibold uppercase leading-snug tracking-wider">
          Discover the fascinating universe
        </div>
        <div className="mt-2">
          <Button
            className="w-fit rounded-lg border border-stone-200 bg-transparent px-3 hover:bg-slate-100 "
            onClick={() => navigate(`${RouterEndPoint.Blogs}`)}
          >
            View more
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:col-span-3 md:auto-cols-[30rem]">
        {blogHighestRating?.data?.data.map((blog, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-slate-300 duration-200 hover:translate-x-1 dark:border-slate-900 md:col-span-1"
          >
            <img src={blog.thumbnail} className="h-[19rem] w-full rounded-t-lg object-cover" loading="lazy" />
            <div
              className=" flex h-[11rem] cursor-pointer flex-col gap-2 rounded-lg  rounded-t-none bg-slate-100 p-4 dark:bg-slate-800"
              onClick={() => navigate(`${RouterEndPoint.Blogs}/${blog.title}`, { state: blog })}
            >
              <div className="truncate text-[0.8rem] text-slate-500/80 ">
                {new Date(blog.createdAt).toLocaleString()}
              </div>
              <div className="line-clamp-2 min-h-12 text-ellipsis font-semibold">{blog.title}</div>
              <div className="line-clamp-3 w-full justify-end overflow-hidden text-ellipsis text-sm text-slate-400/90">
                {blog.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
