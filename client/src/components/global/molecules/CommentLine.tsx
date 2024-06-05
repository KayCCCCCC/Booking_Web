import { Comment } from "@/lib/interface/comment.interface"
import UserAvatar from "./UserAvatar"
import Timer from "./Timer"
import { Dispatch, SetStateAction } from "react"

const CommentLine = ({
  data,
  isRoot,
  commentFor,
  replyComment,
  setReplyFor
}: {
  data: Comment
  isRoot: boolean
  commentFor?: string
  replyComment?: () => void
  setReplyFor?: Dispatch<SetStateAction<number | undefined>>;
}) => {
  return (
    <div className="flex gap-3 pt-2">
      <UserAvatar url={data?.user?.avatar} />
      <div className="flex flex-col">
        <div className="rounded-sm bg-slate-100 px-3 py-2 text-sm">
          <span className="font-medium">{data?.user?.name}</span>
          <div className="">
            <span className="font-medium">{commentFor} </span>
            <span>{data.text}</span>
          </div>
        </div>
        <div className="flex gap-2 p-2 text-sm">
          <Timer time={data.createdAt} />
          {isRoot && replyComment && setReplyFor && (
            <div
              className="cursor-pointer text-sm font-medium"
              onClick={() => {
                replyComment()
                setReplyFor(data.id)
              }}
            >
              Reply
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentLine
CommentLine.default = {
  replyComment: () => {},
  setReplyFor: (id: number) => {},
  commentFor: () => {}
}
