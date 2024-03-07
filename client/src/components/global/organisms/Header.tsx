import Logo from "../molecules/Logo"
import UserButton from "../molecules/UserButton"
// import NavBar from "./NavBar";
import Sidebar from "./Sidebar"
import { cn } from "@/lib/utils"

interface HeaderProps {
  classContent?: string
}
export default function Header({ classContent }: HeaderProps) {
  return (
    <header className={cn("flex h-[60px] w-full items-center justify-between bg-transparent p-4 px-8 ", classContent)}>
      <Logo />
      {/* <NavBar /> */}
      {/* <div className="md:hidden sm:block "><ToggleMenu/></div> */}
      <div className="flex gap-3 ">
        <Sidebar>
          {" "}
          <UserButton />
        </Sidebar>
      </div>
    </header>
  )
}
