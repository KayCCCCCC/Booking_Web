import { Input } from "../atoms/input"
import CalendarCustom from "./CalendarCustom"
import { Form, FormControl, FormField, FormItem } from "../atoms/form"
import { useForm } from "react-hook-form"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { SearchSchema, SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "react-day-picker"

const FilterAccommodation = () => {
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      location: "",
      date: {
        from: new Date(),
        to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      quantity: {
        adult: 1,
        child: 0,
        pet: 0
      }
    }
  })
  const onSubmit = async (values: SearchSchemaType) => {
    console.log(values)
  }
  return (
    <div className="my-4 flex h-28 w-2/3 items-center justify-center gap-2 rounded-full border-2 border-slate-200 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-6 gap-20">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-2 text-left">
                  <FormControl>
                    <Input
                      placeholder="Location"
                      className="flex h-full  items-center justify-center border-none  text-base  shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CalendarCustom form={form} />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-1 flex items-center justify-center ">
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>Quantity</DropdownMenuTrigger>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-1" type="submit">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default FilterAccommodation
