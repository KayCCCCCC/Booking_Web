import { cn } from "@/lib/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"

const UserAvatar = ({url, size}: {url: string, size?: string}) => {
  return (
    <Avatar>
      <AvatarImage src={url} alt="@defaultAvatar" className={cn("h-8 w-8 object-cover rounded-full ", size === "large" && "h-14 w-14")} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
