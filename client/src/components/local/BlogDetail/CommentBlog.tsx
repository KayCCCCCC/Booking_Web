import { Input } from "@/components/global/atoms/input"

const CommentBlog = ({ id }: { id: string }) => {
  return (
    <div className="my-2">
      <div>
        <Input placeholder="Comment here" className="w-full rounded-lg h-14 px-4" />
      </div>
    </div>
  )
}

export default CommentBlog
export default CommentBlog
