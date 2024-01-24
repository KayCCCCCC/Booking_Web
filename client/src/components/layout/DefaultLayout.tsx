import ThemeProvider from "@/provider/ThemeProvider";
import NavBar from "../NavBar";
import { Separator } from "../ui/separator";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const DefaultLayout = () => {
  return (
    <ThemeProvider>
        <div className="flex min-h-screen w-full flex-col items-center dark:bg-black">
            <NavBar/>
            <Separator/>
            <main className="flex flex-grow w-full justify-center  dark:bg-neutral-950">
               <Outlet/>
               <Toaster/>
            </main>
        </div>
    </ThemeProvider>
  )
};

export default DefaultLayout;
