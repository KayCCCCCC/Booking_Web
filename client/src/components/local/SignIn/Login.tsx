import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../global/atoms/form"
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { Input } from "../../global/atoms/input"
import { Button } from "../../global/atoms/button"
import { Link } from "react-router-dom"
import { useState } from "react"
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const form = useForm()

  return (
    <div className="flex h-fit w-[420px] flex-col items-center  justify-center rounded bg-white py-9 text-main">
      <div className="text-center text-2xl font-bold">Sign in </div>
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
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative flex ">
                    <FormLabel>Password</FormLabel>
                    <div className="absolute right-0  text-xs text-rose-600">
                      <Link to={""}>Forget password?</Link>
                    </div>
                  </div>
                  <div className="relative flex ">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={`${isShowPassword ? "text" : "password"}`}
                        {...field}
                        className="rounded"
                      />
                    </FormControl>
                    <FormControl
                      onClick={() => setIsShowPassword((pre) => !pre)}
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
              name="rememberPassword"
              render={({ field }) => (
                <FormItem className="start-0 flex gap-x-2 ">
                  <Input type="checkbox" {...field} className="w-4 cursor-pointer" />
                  <FormDescription className="text-main  ">Remember password?</FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="rounded text-white">
            Submit
          </Button>
        </div>
      </Form>
      <div className="flex gap-1 py-4 text-xs">
        <p className="text-main">Have you ever had an account yet?</p>
        <Link to={"/sign-up"} className="font-bold text-purple-900">
          Sign up
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
    </div>
  )
}

export default Login
