import { Input } from "../atoms/input"
import CalendarCustom from "./CalendarCustom"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../atoms/form"
import { UseFormReturn } from "react-hook-form"
import { SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"
import QuantityInput from "./QuantityInput"
import { Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover"
import { Button } from "../atoms/button"

const FilterHotels = ({
  form,
  onSubmit
}: {
  form: UseFormReturn<SearchSchemaType>
  onSubmit: (value: SearchSchemaType) => Promise<void>
}) => {
  return (
    <div className="flex h-24 w-full items-center justify-center gap-2  rounded-full border-2 border-slate-200 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className=" grid w-full grid-cols-7 gap-10">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="relative col-span-2 ml-10 flex w-60">
                  {field.value !== "" && (
                    <FormLabel className="absolute left-0 top-0 bg-inherit px-4">Location</FormLabel>
                  )}
                  <FormControl>
                    <Input
                      placeholder="Location"
                      className="flex h-full truncate border-none py-2 text-base  shadow-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CalendarCustom form={form} />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-50 relative col-span-2">
                  {(field.value.adult !== 0 || field.value.child !== 0 || field.value.pet !== 0) && (
                    <FormLabel className="absolute left-0 top-0 ">Quantity</FormLabel>
                  )}
                  <FormControl>
                    <Popover>
                      <PopoverTrigger className="w-50 flex items-center truncate py-2 text-left">
                        <Users className="mr-2 h-5 w-5" />
                        {field.value.adult === 0 && field.value.child === 0 && field.value.pet === 0
                          ? "Who?"
                          : `${field.value.adult} adults ${field.value.child !== 0 ? `, ${field.value.child} children` : ""}`}
                        {field.value.pet !== 0 && " ,pets"}
                      </PopoverTrigger>
                      <PopoverContent className="rounded-lg border-2 border-slate-200 p-0" align="start">
                        <div className="flex flex-col gap-2 rounded-lg bg-white px-4 py-2">
                          <QuantityInput
                            fieldName="Adult"
                            description="Above 12 years old"
                            value={field.value.adult}
                            onChange={(value) => field.onChange({ ...field.value, adult: value })}
                          />
                          <QuantityInput
                            fieldName="Children"
                            description="0 - 12 years old"
                            value={field.value.child}
                            onChange={(value) => field.onChange({ ...field.value, child: value })}
                          />
                          <QuantityInput
                            fieldName="Pet"
                            description=""
                            value={field.value.pet}
                            onChange={(value) => field.onChange({ ...field.value, pet: value })}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-1 flex h-fit w-fit justify-end rounded-lg border border-slate-200 px-4 py-2 hover:bg-red-400 hover:text-white"
              type="submit"
              disabled={form.formState.isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default FilterHotels
