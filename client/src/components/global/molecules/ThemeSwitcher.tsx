import React, { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Collapsible } from "../atoms/collapsible"
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Collapsible defaultValue={theme} open={isOpen} onOpenChange={setIsOpen} className="relative w-fit space-y-1">
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 rounded-lg bg-white/[9.0] p-1 dark:bg-stone-400 dark:text-white">
            <div className="*: *:h-[1.6rem] *:w-[1.6rem]  *:rounded-lg *:bg-slate-50 *:p-1 *:dark:bg-black/60">
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </div>
            {!isOpen ? (
              <ChevronsUpDown className="h-4 w-4 cursor-pointer" />
            ) : (
              <ChevronsDownUp className="h-4 w-4 cursor-pointer" />
            )}
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="absolute right-5 z-20 space-y-2 rounded-lg bg-transparent p-1 *:h-[2rem] *:w-[2rem]  *:cursor-pointer *:rounded-lg *:bg-slate-50  *:p-2  *:shadow-sm *:shadow-black *:dark:bg-black/60 *:dark:text-white *:dark:shadow-white">
        <SunIcon className="hover:translate-x-[2px]" onClick={() => setTheme("light")} />
        <MoonIcon
          className="rotate-90 transition-all hover:translate-x-[2px] dark:rotate-0"
          onClick={() => setTheme("dark")}
        />
      </CollapsibleContent>
    </Collapsible>
  )
}

export default ThemeSwitcher
