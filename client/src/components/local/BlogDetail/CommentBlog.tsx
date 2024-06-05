import { Input } from "@/components/global/atoms/input"
import { Textarea } from "@/components/global/atoms/textarea"
import CommentLine from "@/components/global/molecules/CommentLine"
import UserAvatar from "@/components/global/molecules/UserAvatar"
import { commentBlog, getCommentBlogById, replyCommentBlog } from "@/lib/services/CommentBlogServices"
import { RootState } from "@/store/store"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { SendHorizonal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const CommentBlog = ({ id }: { id: number }) => {
  const [isReply, setIsReply] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>("")
  const [replyValue, setReplyValue] = useState<string>("")
  const [replyFor, setReplyFor] = useState<number | undefined>(undefined)
  const [commentForward, setCommentForward] = useState<string>("")
  const [isSending, setIsSending] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const { user } = useSelector((state: RootState) => state?.auth)
  const comment = useQuery({
    queryKey: ["comment-blog", id],
    queryFn: () => getCommentBlogById({ id })
  })

  const cutNameOfUser = (content: string) => {
    const isExisted = content.startsWith(commentForward.trim())
    console.log(isExisted, commentForward)

    if (isExisted) {
      const arrContent = content.replace(commentForward.trim(), "")
      console.log(arrContent)

      return arrContent.trim()
    }
    return content.trim()
  }

  const handleReplyCmt = (replyCommentId: number) => {
    if (isSending) return
    setIsSending(true)
    replyCommentBlog({
      content: cutNameOfUser(replyValue),
      blogId: id,
      userId: user.id,
      replyCommentId
    })
      .then(() => {
        setReplyValue("")
        queryClient.invalidateQueries({ queryKey: ["comment-blog", id] })
        setIsReply(false)
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  const handleCmt = () => {
    if (isSending) return
    setIsSending(true)
    commentBlog({ content: commentValue.trim() || "", blogId: id, userId: user.id })
      .then(() => {
        setCommentValue("")
        queryClient.invalidateQueries({ queryKey: ["comment-blog", id] })
      })
      .finally(() => {
        setIsSending(false)
      })
  }
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (textAreaRef.current) {
      const len = textAreaRef.current.value.length
      textAreaRef.current.setSelectionRange(len, len)
      textAreaRef.current.focus()
    }
  }, [isReply])
  
  return (
    <div className="my-2 flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Comment here"
          className="h-14 w-full rounded-lg px-4"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <SendHorizonal size={24} className="cursor-pointer" onClick={() => handleCmt()} aria-disabled={isSending} />
      </div>
      <div>
        {comment.data?.data.map((cmt) => (
          <div key={cmt.id}>
            <CommentLine data={cmt} isRoot replyComment={() => setIsReply(true)} setReplyFor={setReplyFor} />
            {cmt.replies &&
              cmt.replies.map((reply) => (
                <div className="ml-6" key={reply.id}>
                  <CommentLine data={reply} isRoot={false} commentFor={cmt?.user?.name} />
                </div>
              ))}
            {isReply && replyFor === cmt.id && (
              <div className="ml-6 flex items-start justify-start gap-2">
                <UserAvatar url={user?.avatar} />
                <Textarea
                  ref={textAreaRef}
                  className="h-14 w-full rounded-lg px-4"
                  defaultValue={`${cmt?.user?.name} `}
                  onChange={(e) => setReplyValue(e.target.value)}
                  onBlur={() => setCommentForward(cmt?.user?.name)}
                />
                <SendHorizonal
                  className="cursor-pointer"
                  onClick={() => {
                    handleReplyCmt(cmt.id)
                  }}
                  aria-disabled={isSending}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentBlog
