import { Avatar, AvatarImage } from "../atoms/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "../atoms/dropdown-menu"

const UserButton: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/img1.jpg" alt="@defaultAvatar" className="h-12 w-12 object-cover " />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white font-medium">
        <DropdownMenuLabel className="text-md">My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Booking History
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem> */}
          <DropdownMenuItem className="text-normal cursor-pointer font-normal hover:bg-slate-50">
            Log out
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
