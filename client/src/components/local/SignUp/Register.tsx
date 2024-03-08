import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../global/atoms/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../global/atoms/form"
import { Input } from "../../global/atoms/input"
import { useState } from "react"
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { Button } from "../../global/atoms/button"
import { Link } from "react-router-dom"
import { registerUserSchema } from "../../../lib/schema/registerUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "../../global/atoms/checkbox"
import { RegisterUser } from "@/lib/interface/user.interface"

interface RegisterProps {
  success: () => void
}
const Register = ({ success }: RegisterProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false)

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      policyAccepted: false
    }
  })
  // const onSubmit = async(data: registerUserSchemaType) => {
  //   try {

  //   } catch (error) {
  //   }
  // };
  return (
    <Card className="flex h-fit w-[420px] flex-col items-center  justify-center rounded bg-white py-2 text-main">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-center text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Please type your email and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex w-[300px] flex-col gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} className="rounded" />
                  </FormControl>
                  <FormMessage />
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
                      />
                    </FormControl>
                    <FormControl
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-2 top-2 items-center justify-items-center text-main hover:opacity-85"
                    >
                      {!isShowPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                    </FormControl>
                  </div>
                  <FormMessage />
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
                      />
                    </FormControl>
                    <div
                      // onClick={() => setIsShowPasswordConfirm((pre) => !pre)}
                      className="absolute right-2 top-2 items-center justify-items-center text-main hover:opacity-85"
                    >
                      {!isShowPasswordConfirm ? (
                        <FaRegEye size={20} onClick={() => setIsShowPasswordConfirm(true)} />
                      ) : (
                        <FaRegEyeSlash size={20} onClick={() => setIsShowPasswordConfirm(false)} />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="policyAccepted"
              render={() => (
                <FormItem className="start-0 flex items-center justify-center gap-x-2 ">
                  <FormControl>
                    <Checkbox
                      id="policyAccepted"
                      className="data-[state=checked]:bg-grey-300 bg-white "
                      defaultChecked
                    />
                  </FormControl>
                  <FormLabel className="text-xs text-main  " htmlFor="policyAccepted">
                    <div>
                      <div className="inline">By creating an account, you agree to our</div>{" "}
                      <Link to={"/"} className="font-semibold text-indigo-700 underline">
                        Terms & Condition and Privacy Policy
                      </Link>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded text-white">
              Create account
            </Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex gap-1 py-2 text-xs">
          <div className="text-main">Already have an account?</div>
          <Link to={"/sign-in"} className="font-bold text-purple-900">
            Sign in
          </Link>
        </div>
        <div className="font-semibold text-main">OR</div>
        <div className="flex gap-x-2 py-2 text-main ">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded  bg-secondary hover:opacity-85">
            <FaFacebook size={25} />
          </div>
          <div className="flex h-10 w-10 cursor-pointer items-center  justify-center rounded  bg-secondary hover:opacity-85">
            <FaGoogle size={25} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Register
