import { useSelector } from "react-redux"
import Logo from "../molecules/Logo"
import NavBar from "../molecules/NavBar"
import ThemeSwitcher from "../molecules/ThemeSwitcher"
import UserButton from "../molecules/UserButton"
// import NavBar from "./NavBar";
import { cn } from "@/lib/utils/cn"
import { RootState } from "@/store/store"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

interface HeaderProps {
  classContent?: string
}

export default function Header({ classContent }: HeaderProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state?.auth)
  console.log(isAuthenticated)

  return (
    <header
      className={cn(" flex h-[70px] w-full items-center justify-between bg-transparent p-4 px-20   ", classContent)}
    >
      <Logo />
      <NavBar />
      <div className="flex items-center ">
        <ThemeSwitcher />
        {isAuthenticated ? (
          <UserButton />
        ) : (
          <Link to={"/sign-in"}>
            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-white  p-2 font-medium hover:text-gray-600">
              Login{" "}
              <span>
                <ArrowRight size={20} />
              </span>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}
