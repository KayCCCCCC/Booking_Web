import PaginationCustom from "@/components/global/molecules/PaginationCustom"
import ListBlog from "@/components/local/BlogDetail/ListBlog"
import { getAllBlog } from "@/lib/services/BlogServices"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

const BlogsPage = () => {
  const [page, setPage] = useState<number>(1)
  const blogList = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getAllBlog({ page })
  })
  const latestBlog = blogList && useMemo(() => blogList?.data?.data[0] ?? null, [])
  console.log(latestBlog)
  return (
    <div className="m-14 flex flex-col gap-2">
      <span className="ml-10 p-2 text-4xl font-medium uppercase"> Latest Blog</span>
      <ListBlog blogs={blogList.data?.data ?? []} latestBlog={latestBlog} />
      {blogList.data?.totalPages && (
        <PaginationCustom totalPages={blogList.data?.totalPages} currentPage={page} setPage={setPage} />
      )}
    </div>
  )
}

export default BlogsPage
