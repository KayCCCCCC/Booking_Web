import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../global/atoms/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../global/atoms/form"
import { Input } from "../../global/atoms/input"
import { useState } from "react"
import { Button } from "../../global/atoms/button"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "../../global/atoms/checkbox"
import { useDispatch } from "react-redux"
import { signUpFirstStep } from "@/store/slices/AuthSlice"
import { firstStepSignUp } from "@/lib/services/AuthServices"
import { RegisterUserSchema, RegisterUserSchemaType } from "../../../lib/schema/SignUp/RegisterUser.schema"
import { Eye, EyeOff } from "lucide-react"

interface RegisterProps {
  success: () => void
}
const Register = ({ success }: RegisterProps) => {
  const dispatch = useDispatch()
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false)
  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      policyAccepted: true
    }
  })

  const onSubmit = async (data: RegisterUserSchemaType) => {
    const response = await firstStepSignUp({ data })
    if (response.success) {
      dispatch(signUpFirstStep(response.data?.email))
      success()
    }
  }
  return (
    <Card className="text-main flex h-fit w-[420px] flex-col  items-center justify-center rounded bg-white py-2">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-center text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Please type your email and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-[300px] flex-col gap-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} className="rounded" autoComplete="email" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative flex ">
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type={`${isShowPassword ? "text" : "password"}`}
                          {...field}
                          className="rounded"
                          value={field.value || ""}
                          autoComplete="password"
                        />
                      </FormControl>
                      <div
                        onClick={() => setIsShowPassword((prev) => !prev)}
                        className="text-main absolute right-2 top-2 items-center justify-items-center hover:opacity-85"
                      >
                        {!isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <div className="relative flex ">
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          type={`${isShowPasswordConfirm ? "text" : "password"}`}
                          {...field}
                          className="rounded"
                          value={field.value || ""}
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <div
                        // onClick={() => setIsShowPasswordConfirm((pre) => !pre)}
                        className="text-main absolute right-2 top-2 items-center justify-items-center hover:opacity-85"
                      >
                        {!isShowPasswordConfirm ? (
                          <Eye size={20} onClick={() => setIsShowPasswordConfirm(true)} />
                        ) : (
                          <EyeOff size={20} onClick={() => setIsShowPasswordConfirm(false)} />
                        )}
                      </div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="policyAccepted"
                render={({ field }) => (
                  <FormItem className="start-0 flex items-center justify-center gap-x-2 ">
                    <FormControl>
                      <Checkbox
                        id="policyAccepted"
                        className="data-[state=checked]:bg-grey-300 bg-white "
                        checked={field.value}
                        onCheckedChange={(isChecked) => field.onChange(isChecked ? true : false)}
                      />
                    </FormControl>
                    <FormLabel className="text-main text-xs  " htmlFor="policyAccepted">
                      <div>
                        <div className="inline">By creating an account, you agree to our</div>{" "}
                        <Link to={"/"} className="font-semibold text-indigo-700 underline">
                          Terms & Condition and Privacy Policy
                        </Link>
                      </div>
                    </FormLabel>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded text-white" disabled={form.formState.isLoading}>
                Create account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex gap-1 py-2 text-xs">
          <div className="text-main">Already have an account?</div>
          <Link to={"/sign-in"} className="font-bold text-purple-900">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Register
