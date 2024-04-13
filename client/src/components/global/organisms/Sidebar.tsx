import React, { ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "../atoms/sheet"
// import UserAvatar from "../molecules/UserAvatar"
import { Separator } from "../atoms/separator"
interface Props {
  children: ReactNode
}
const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-start gap-3 py-2  ">
          {/* <UserAvatar /> */}
          <div className="flex flex-col gap-1">
            <div>Tran Trung Hieu</div>
            <button className="w-fit">Basic</button>
          </div>
        </SheetHeader>
        <Separator />
        <SheetDescription>
          <div></div>
        </SheetDescription>
        <Separator />
        <SheetFooter>Log out</SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Sidebar
