import { useDispatch, useSelector } from "react-redux"
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
import { RootState } from "@/store/store"
import { LogOut } from "lucide-react"
import { logout } from "@/lib/services/AuthServices"
import { logOut } from "@/store/slices/AuthSlice"

const UserButton: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    logout()
    dispatch(logOut())

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.avatar} alt="@defaultAvatar" className="h-12 w-12 object-cover " />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white font-medium">
        <DropdownMenuLabel className="text-md">{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-base font-normal hover:bg-slate-50" onClick={handleLogout}>
            Log out
            <span className="px-3">
              <LogOut />
            </span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
