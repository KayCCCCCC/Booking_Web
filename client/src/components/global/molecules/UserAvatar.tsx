import { cn } from "@/lib/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"

interface AvatarProps {
  url: string
  size?: string
}

const UserAvatar = ({ url, size }: AvatarProps) => {
  return (
    <Avatar>
      <AvatarImage
        src={url}
        alt="@defaultAvatar"
        className={cn("h-8 w-8 rounded-full object-cover ", size === "large" && "h-14 w-14")}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
