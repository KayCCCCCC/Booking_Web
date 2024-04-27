import { Comment } from "@/lib/interface/comment.interface"
import UserAvatar from "./UserAvatar"
import Timer from "./Timer"

const CommentLine = ({
  data,
  isRoot,
  commentFor,
  replyComment
}: {
  data: Comment
  isRoot: boolean
  commentFor?: string
  replyComment?: () => void
}) => {
  return (
    <div className="flex gap-3">
      <UserAvatar url={data.user.avatar} />
      <div className="flex flex-col">
        <div className="rounded-sm bg-slate-100 px-3 py-2 text-sm">
          <span className="font-medium">{data.user.name}</span>
          <div className="">
            <span className="font-medium">{commentFor} </span>
            <span>{data.text}</span>
          </div>
        </div>
        <div className="flex gap-2 p-2 text-sm">
          <Timer time="2024-04-14T12:00:00Z" />
          {isRoot && (
            <div className="cursor-pointer text-sm font-medium" onClick={replyComment}>
              Reply
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentLine
