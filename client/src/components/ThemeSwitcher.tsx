
import  { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(()=> {
        return setMounted(true);
    },[]);

    if (!mounted) return null;
  return (
    <Tabs defaultValue={theme} className="">
        <TabsList className="border flex gap-1">
            <TabsTrigger value="light" onClick={()=> setTheme("light")} >
                <SunIcon className="h-[1.1rem] w-[1.1rem]"/>
            </TabsTrigger>
            <TabsTrigger value="dark" onClick={()=> setTheme("dark")} >
                <MoonIcon className="h-[1.1rem] w-[1.1rem] rotate-90 transition-all dark:rotate-0"/>
            </TabsTrigger>
            <TabsTrigger value="system" onClick={()=> setTheme("system")} >
                <DesktopIcon className="h-[1.1rem] w-[1.1rem]"/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
};

export default ThemeSwitcher;
