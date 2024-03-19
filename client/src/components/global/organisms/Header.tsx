import Logo from "../molecules/Logo"
import UserButton from "../molecules/UserButton"
// import NavBar from "./NavBar";
import { cn } from "@/lib/utils/cn"

interface HeaderProps {
  classContent?: string
}
export default function Header({ classContent }: HeaderProps) {
  return (
    <header className={cn("flex h-[70px] w-full items-center justify-between bg-transparent p-4 px-8 ", classContent)}>
    <Logo />
    <div className="flex gap-3 ">
        <UserButton />
    </div>
  </header>
  )
}
