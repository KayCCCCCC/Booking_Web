import { Input } from "@/components/global/atoms/input"
import { Textarea } from "@/components/global/atoms/textarea"
import CommentLine from "@/components/global/molecules/CommentLine"
import UserAvatar from "@/components/global/molecules/UserAvatar"
import { commentBlog, getCommentBlogById, replyCommentBlog } from "@/lib/services/CommentBlogServices"
import { RootState } from "@/store/store"
import { useQuery } from "@tanstack/react-query"
import { SendHorizonal } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const CommentBlog = ({ id }: { id: number }) => {
  const [isReply, setIsReply] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>("")
  const [replyValue, setReplyValue] = useState<string>("")
  const comment = useQuery({
    queryKey: ["comment-blog", id],
    queryFn: () => getCommentBlogById({ id })
  })
  const replyComment = () => {
    setIsReply(true)
  }

  const { user } = useSelector((state: RootState) => state?.auth)
  console.log(comment.data?.data)
  const handleReplyCmt = (replyCommentId: number) => {
    if (isSending) return
    setIsSending(true)
    replyCommentBlog({ content: replyValue, blogId: id, userId: user.id, replyCommentId })
      .then(() => {
        setReplyValue("")
      })
      .finally(() => {
        setIsSending(false)
      })
  }
  const [isSending, setIsSending] = useState<boolean>(false)
  const handleCmt = () => {
    if (isSending) return
    setIsSending(true)
    commentBlog({ content: commentValue || "", blogId: id, userId: user.id })
      .then(() => {
        setCommentValue("")
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <div className="my-2 flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Comment here"
          className="h-14 w-full rounded-lg px-4"
          value={commentValue}
          onBlur={(e) => setCommentValue(e.target.value)}
        />
        <SendHorizonal size={24} className="cursor-pointer" onClick={() => handleCmt()} aria-disabled={isSending} />
      </div>
      <div>
        {comment.data?.data.map((cmt) => (
          <div key={cmt.id}>
            <CommentLine data={cmt} isRoot replyComment={replyComment} />
            {cmt.replies &&
              cmt.replies.map((reply) => (
                <div className="ml-6" key={reply.id}>
                  <CommentLine data={reply} isRoot={false} commentFor={cmt?.user?.name} />
                </div>
              ))}
            {isReply && (
              <div className="ml-6 flex items-start justify-start gap-2">
                {/* <UserAvatar url={user?.avatar} /> */}
                <Textarea
                  className="h-14 w-full rounded-lg px-4"
                  defaultValue={`${cmt?.user?.name} `}
                  value={replyValue}
                  onBlur={(e) => setReplyValue(e.target.value)}
                />
                <SendHorizonal className="cursor-pointer" onClick={() => handleReplyCmt(cmt.id)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentBlog
