import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { FormControl, FormField, FormItem, FormLabel } from "../atoms/form"
import { Button } from "react-day-picker"
import { cn } from "@/lib/utils/cn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../atoms/calendar"
import { UseFormReturn } from "react-hook-form"
import { SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"

const CalendarCustom = ({ form }: { form: UseFormReturn<SearchSchemaType> }) => {
  return (
    <FormField
      control={form.control}
      name={"date"}
      render={({ field }) => (
        <FormItem className="relative col-span-2 flex items-center justify-center">
          {field.value.from !== undefined && (
            <FormLabel className="absolute left-0 top-0 ">Check-in -&gt; Checkout</FormLabel>
          )}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  className={cn(
                    "flex w-full items-center justify-start py-2 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y") || "_"} - {format(field.value.to, "LLL dd, y") || "_"}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y") || "_"
                    )
                  ) : (
                    <span>When?</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-50 w-auto p-0 " align="center">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={new Date()}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  className="z-20 rounded-sm border border-slate-100 bg-white  shadow"
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default CalendarCustom
