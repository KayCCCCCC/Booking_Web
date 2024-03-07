import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/defaultavatar.png" alt="@defaultAvatar" className="h-[33px] w-[33px] object-contain " />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
