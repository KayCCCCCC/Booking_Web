import Logo from "../molecules/Logo"
import NavBar from "../molecules/NavBar"
import ThemeSwitcher from "../molecules/ThemeSwitcher"
import UserButton from "../molecules/UserButton"
// import NavBar from "./NavBar";
import { cn } from "@/lib/utils/cn"

interface HeaderProps {
  classContent?: string
}

export default function Header({ classContent }: HeaderProps) {
  return (
    <header
      className={cn(" flex h-[70px] w-full items-center justify-between bg-transparent p-4 px-20   ", classContent)}
    >
      <Logo />
      <NavBar />
      <div className="flex items-center ">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  )
}
