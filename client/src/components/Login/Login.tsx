import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const form = useForm();

  return (
    <div className="w-[420px] h-fit bg-white rounded flex  flex-col items-center justify-center py-9 text-main">
      <div className="text-center text-2xl font-bold">Sign in </div>
      <Form {...form}>
        <div className="flex flex-col w-[300px] gap-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="rounded"
                  />
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
                  <div className="flex relative ">
                    <FormLabel>Password</FormLabel>
                    <div className="text-rose-600 text-xs  absolute right-0">
                      <Link to={""}>Forget password?</Link>
                    </div>
                  </div>
                  <div className="flex relative ">
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
                      {!isShowPassword ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
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
                <FormItem className="flex gap-x-2 start-0 ">
                  <Input
                    type="checkbox"
                    {...field}
                    className="w-4 cursor-pointer"
                  />
                  <FormDescription className="text-main  ">
                    Remember password?
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="rounded text-white">
            Submit
          </Button>
        </div>
      </Form>
      <div className="flex text-xs gap-1 py-4">
        <p className="text-main">Have you ever had an account yet?</p>
        <Link to={"/sign-up"} className="text-purple-900 font-bold">
          Sign up
        </Link>
      </div>
      <div className="font-semibold text-main">OR</div>
      <div className="flex text-main gap-x-2 py-2 ">
        <div className="bg-secondary flex rounded w-10 h-10 items-center justify-center  cursor-pointer hover:opacity-85">
          <FaFacebook size={25} />
        </div>
        <div className="bg-secondary flex rounded w-10 h-10  items-center justify-center  cursor-pointer hover:opacity-85">
          <FaGoogle size={25} />
        </div>
      </div>
    </div>
  );
};

export default Login;
