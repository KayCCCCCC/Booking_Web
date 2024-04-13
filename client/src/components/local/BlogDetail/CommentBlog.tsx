import { Input } from "@/components/global/atoms/input"

const CommentBlog = ({ id }: { id: string }) => {
  return (
    <div className="my-2">
      <div>
        <Input placeholder="Comment here" className="h-14 w-full rounded-lg px-4" />
        <span>{id}</span>
      </div>
    </div>
  )
}

export default CommentBlog
