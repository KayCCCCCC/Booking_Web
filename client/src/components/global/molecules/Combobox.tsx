import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/global/atoms/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/global/atoms/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/global/atoms/popover"
import { Country } from "@/lib/interface/country.interface"

type ComboboxProps = {
  data: Country[]
  value: string
  setValue: (nation: string) => void
}
const Combobox = ({ data, value, setValue }: ComboboxProps) => {
  const contriesName: string[] = data && data.map((country: Country) => country.country)
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="text-main w-[300px] justify-between">
          {value ? contriesName.find((country) => country.toLowerCase() === value) : "Select your country..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="text-main max-h-[300px]  bg-white">
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup className=" overflow-y-auto">
            {contriesName.map((country, index) => (
              <CommandItem
                key={index}
                value={country}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className=" rounded hover:bg-gray-200"
              >
                {country}
                <CheckIcon className={cn("ml-auto h-4 w-4", value === country ? "opacity-100" : "opacity-0")} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default Combobox
