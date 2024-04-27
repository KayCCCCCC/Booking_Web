import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../global/atoms/form"
import { Input } from "../../global/atoms/input"
import { Button } from "../../global/atoms/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginUserSchemaType } from "@/lib/schema/SignIn/LoginUser.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginUserSchema } from "../../../lib/schema/SignIn/LoginUser.schema"
import { login, loginWithGG } from "@/lib/services/AuthServices"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/store/slices/AuthSlice"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { GGAccountType } from "@/lib/schema/SignUp/GGAcount.schema"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const form = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onSubmit = async (data: LoginUserSchemaType) => {
    try {
      const response = await login({ data })
      if (response.success) {
        dispatch(setCredentials(response))
        navigate("/home")
      } else {
        toast(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const auth = getAuth()
  const handleLoginWithGG = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    const data: GGAccountType = {
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL
    }
    try {
      const response = await loginWithGG({ data })

      if (response.success) {
        dispatch(setCredentials(response))
        navigate("/home")
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="text-main flex h-fit w-[420px] flex-col  items-center justify-center rounded bg-white py-9">
      <div className="text-center text-2xl font-bold">Sign in </div>
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
                        className="text-main absolute right-2 top-2 items-center justify-items-center hover:opacity-85"
                      >
                        {!isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="rememberPassword"
                render={({ field }) => (
                  <FormItem className="start-0 flex gap-x-2 ">
                    <Input type="checkbox" {...field} className="w-4 cursor-pointer" />
                    <FormDescription className="text-main  ">Remember password?</FormDescription>
                  </FormItem>
                )}
              /> */}
            </div>
            <Button type="submit" className="rounded bg-primary text-white" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex gap-1 py-4 text-xs">
        <p className="text-main">Have you ever had an account yet?</p>
        <Link to={"/sign-up"} className="font-bold text-purple-900">
          Sign up
        </Link>
      </div>
      <div className="text-main font-semibold">OR</div>
      <div className="text-main flex gap-x-4 py-2 ">
        <div className=" flex h-12 w-12 cursor-pointer items-center justify-center  rounded hover:opacity-85">
          <img src="/assets/facebook.webp" className="h-10 w-10" />
        </div>
        <div
          className=" flex h-12 w-12 cursor-pointer  items-center justify-center  rounded hover:opacity-85"
          onClick={handleLoginWithGG}
        >
          <img src="/assets/google.png" className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}

export default Login
