import { Avatar, AvatarImage } from "../atoms/avatar"
import {
  DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger
} from "../atoms/dropdown-menu"

const UserButton: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/defaultavatar.png" alt="@defaultAvatar" className="h-[33px] w-[33px] object-contain " />
        </Avatar>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Booking History
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent> */}
    </DropdownMenu>
  )
}

export default UserButton
