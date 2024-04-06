import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../global/atoms/card"
import { Button } from "../../global/atoms/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../global/atoms/form"
import { useForm } from "react-hook-form"
import { Input } from "../../global/atoms/input"
import { useEffect, useState } from "react"
import Combobox from "../../global/molecules/Combobox"
import { getNationsInTheWorld } from "@/lib/services/CountryServices"
import { Country } from "@/lib/interface/country.interface"
import { UpdateInforUserSchemaType } from "@/lib/schema/SignUp/UpdateInfoUser.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateInfoUserSchema } from "../../../lib/schema/SignUp/UpdateInfoUser.schema"
import { updateInforUser } from "@/lib/services/AuthServices"
import { useDispatch, useSelector } from "react-redux"
import { setInfor } from "@/store/slices/AuthSlice"
import { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const UpdateInformation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
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
  const form = useForm<UpdateInforUserSchemaType>({
    resolver: zodResolver(UpdateInfoUserSchema),
    defaultValues: {
      email: user.email,
      name: "",
      country: nation,
      address: "",
      phone: ""
    }
  })
  const onSubmit = async (data: UpdateInforUserSchemaType) => {
    try {
      console.log(data)

      const response = await updateInforUser({ data })
      if (response.success) {
        dispatch(setInfor(response.data))
        handleSkip()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSkip = () => {
    navigate("/home")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="text-main bg-white ">
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="text-center text-2xl font-bold">Complete your profile</CardTitle>
            <CardDescription>Please enter Your Name, Country and Address</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="flex w-[300px] flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="rounded" placeholder="Type your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input className="rounded" placeholder="Type your phone" {...field} />
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
                      <Input className="rounded" placeholder="Type your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <Button className="w-[300px] rounded text-white" type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
            <div>
              <Button onClick={handleSkip} className=" mt-2 bg-transparent hover:bg-slate-100">
                Skip
                <ChevronRight />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default UpdateInformation
