import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
  return <Avatar>
    <AvatarImage src="/defaultavatar.png" alt="@defaultAvatar"  className="w-[33px] h-[33px] object-contain "/>
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
};

export default UserAvatar;
