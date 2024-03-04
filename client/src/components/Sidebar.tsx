import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/separator";
interface Props {
  children: ReactNode;
}
const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-start gap-3 py-2  ">
          <UserAvatar />
          <div className="flex gap-1 flex-col">
            <div>Tran Trung Hieu</div>
            <button className="w-fit">Basic</button>
          </div>
        </SheetHeader>
        <Separator/>
        <SheetDescription>
        <div></div>
        </SheetDescription>
        <Separator/>
        <SheetFooter>Log out</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
