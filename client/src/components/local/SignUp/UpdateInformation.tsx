import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../global/atoms/card"
import { Button } from "../../global/atoms/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../global/atoms/form"
import { useForm } from "react-hook-form"
import { Input } from "../../global/atoms/input"
import { useEffect, useState } from "react"
import Combobox from "../../global/molecules/Combobox"
import { getNationsInTheWorld } from "@/lib/services/country.api"
import { Country } from "@/lib/interface/country"

type UpdateInformationProps = {
  success: () => void
}

const UpdateInformation = ({ success }: UpdateInformationProps) => {
  const [nation, setNation] = useState<string>("")
  const handleSetNation = (nation: string) => {
    setNation(nation)
  }
  const [countries, setCountries] = useState<Array<Country>>()
  useEffect(() => {
    const getCountries = async () => {
      const data = await getNationsInTheWorld()
      setCountries(data)
    }
    getCountries()
  }, [])
  const form = useForm()
  return (
    <Card className="bg-white text-main ">
      <CardHeader>
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-center text-2xl font-bold">Complete your profile</CardTitle>
          <CardDescription>Please enter Your Name, Country and Address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Form {...form}>
            <div className="flex w-[300px] flex-col gap-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="rounded" {...field} placeholder="Type your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <div className="mb-2 text-sm  font-medium">Country</div>
                <Combobox data={countries ?? []} value={nation} setValue={(nation) => handleSetNation(nation)} />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input className="rounded" {...field} placeholder="Type your address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button className="w-[300px] rounded text-white">Submit</Button>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default UpdateInformation
