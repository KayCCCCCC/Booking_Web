import Logo from "./Logo";
import UserButton from "./UserButton";
// import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  classContent?: string;
}
export default function Header({ classContent }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between h-[60px] p-4 px-8 bg-transparent ",
        classContent
      )}
    >
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
  );
}
