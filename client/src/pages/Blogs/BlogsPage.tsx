import ListBlog from "@/components/local/BlogDetail/ListBlog"
import { getAllBlog } from "@/lib/services/BlogServices"
import { useQuery } from "@tanstack/react-query"

const BlogsPage = () => {
  const blogList = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlog
  })
  if (!blogList) return null
  return (
    <div className="m-14">
      <ListBlog blogs={blogList.data?.blogs ?? []} />
    </div>
  )
}

export default BlogsPage
