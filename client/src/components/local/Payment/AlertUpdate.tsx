import { Input } from "@/components/global/atoms/input"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../../global/atoms/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/global/atoms/form"
import { useForm } from "react-hook-form"
import { PhoneSchema, PhoneSchemaType } from "@/lib/schema/SignUp/UpdateUser.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePhone } from "@/lib/services/AuthServices"
import { useDispatch } from "react-redux"
import { Button } from "@/components/global/atoms/button"
import { setInfor } from "@/store/slices/AuthSlice"
import { useState } from "react"

const AlertUpdate = ({ nameType, email }: { nameType: string; email: string }) => {
  const dispatch = useDispatch()
  const form = useForm<PhoneSchemaType>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      email,
      phone: ""
    }
  })
const [isOpen, setIsOpen] = useState<boolean>(true)
  const onSubmit = async (data: PhoneSchemaType) => {
    try {
      const res = await updatePhone(data)
      if (res.success) {
        dispatch(setInfor(res.data))
      }
      setIsOpen(false)
    } catch (error) {
      console.error("Error updating phone:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="rounded-md bg-red-500 px-2 py-1 text-white">Update Now</div>
      </AlertDialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Update your information now!</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{nameType}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={nameType}
                          {...field}
                          className="rounded"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400"/>
                    </FormItem>
                  )}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  )
}

export default AlertUpdate
