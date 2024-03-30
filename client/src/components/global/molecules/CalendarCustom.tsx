import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { FormControl, FormField, FormItem, FormMessage } from "../atoms/form"
import { Button } from "react-day-picker"
import { cn } from "@/lib/utils/cn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../atoms/calendar"
import { UseFormReturn } from "react-hook-form"
import { SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"

const CalendarCustom = ({ form }: { form: UseFormReturn<SearchSchemaType>  }) => {
  return (
    <FormField
      control={form.control}
      name={"date"}
      render={({ field }) => (
        <FormItem className="flex items-center justify-center col-span-2 ">
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  className={cn(
                    "flex items-center w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a field</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 " align="center">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  className="bg-white border border-slate-100 rounded-sm shadow  "
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CalendarCustom
