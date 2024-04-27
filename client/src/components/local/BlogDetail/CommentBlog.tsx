import { Input } from "@/components/global/atoms/input"
import { Textarea } from "@/components/global/atoms/textarea"
import CommentLine from "@/components/global/molecules/CommentLine"
import UserAvatar from "@/components/global/molecules/UserAvatar"
import { getCommentBlogById } from "@/lib/services/CommentBlogServices"
import { RootState } from "@/store/store"
import { useQuery } from "@tanstack/react-query"
import { SendHorizonal } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const CommentBlog = ({ id }: { id: string }) => {
  const [isReply, setIsReply] = useState<boolean>(false)
  const comment = useQuery({
    queryKey: ["comment-blog", id],
    queryFn: () => getCommentBlogById({ id })
  })
  const replyComment = () => {
    setIsReply(true)
  }

  const { user } = useSelector((state: RootState) => state?.auth)
  console.log(comment.data?.data)

  return (
    <div className="my-2 flex w-full flex-col gap-4">
      <div>
        <Input placeholder="Comment here" className="h-14 w-full rounded-lg px-4" />
      </div>
      <div>
        {comment.data?.data.map((cmt) => (
          <div key={cmt.id}>
            <CommentLine data={cmt} isRoot replyComment={replyComment} />
            {cmt.replies &&
              cmt.replies.map((reply) => (
                <div className="ml-6" key={reply.id}>
                  <CommentLine data={reply} isRoot={false} commentFor={cmt.user.name} />
                </div>
              ))}
            {isReply && (
              <div className="ml-6 flex items-start justify-start gap-2">
                <UserAvatar url={user.avatar} />
                <Textarea className="h-14 w-full rounded-lg px-4" defaultValue={`${cmt.user.name} `} />
                <SendHorizonal />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentBlog
