import { SearchSchemaType } from "@/lib/schema/Accommodation/Search.schema"
import React, { ChangeEvent, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../atoms/form"
import { Input } from "../atoms/input"
import { searchAddress } from "@/lib/services/MapServices"
import { Feature } from "@/lib/interface/feature.map.interface"
interface AutoCompleteAddressProps {
  form: UseFormReturn<SearchSchemaType>
}
const AutoCompleteAddress: React.FC<AutoCompleteAddressProps> = ({ form }) => {
  const [addressList, setAddressList] = useState<Feature[] | null>()
  const [address, setAddress] = useState<string>("")
  const handleChangeSearchAddress = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value
    setAddress(searchText)
    const data = await searchAddress({ searchText })
    setAddressList(data.suggestions)
    if (searchText === "") setAddressList(null)
  }

  console.log(form.getValues("address"))

  return (
    <>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="relative col-span-2 ml-10 flex w-60">
            {field.value !== "" && <FormLabel className="absolute left-0 top-0 bg-inherit px-4">Location</FormLabel>}
            <FormControl>
              <Input
                placeholder="Location"
                className="flex h-full truncate border-none py-2 text-base  shadow-none focus-visible:ring-0"
                {...field}
                value={address}
                onChange={(e) => handleChangeSearchAddress(e)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {addressList && (
        <div className="left-1/5 absolute top-20 z-20 w-96 rounded-md bg-white p-1 shadow-md ">
          {addressList?.map((item: Feature, index: number) => (
            <h2
              key={index}
              className="cursor-pointer rounded p-3 text-black hover:bg-gray-100"
              onClick={() => {
                form.setValue("address", item.name)
                setAddress(item.name)
                setAddressList(null)
              }}
            >
              {item.name}
            </h2>
          ))}
        </div>
      )}
    </>
  )
}

export default AutoCompleteAddress
