import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface RegisterProps {
  success: () => void;
}
const Register = ({ success }: RegisterProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] =
    useState<boolean>(false);
  const form = useForm();

  return (
    <Card className="w-[420px] h-fit bg-white rounded flex  flex-col items-center justify-center py-2 text-main">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-center text-2xl font-bold">
          Sign Up
        </CardTitle>
        <CardDescription>Step 1/3</CardDescription>
      </CardHeader>
      <CardContent>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex relative ">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={`${isShowPassword ? "text" : "password"}`}
                        {...field}
                        className="rounded"
                      />
                    </FormControl>
                    {/* <FormControl
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-2 top-2 items-center justify-items-center text-main hover:opacity-85"
                    >
                      {!isShowPassword ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </FormControl> */}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <div className="flex relative ">
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        type={`${isShowPasswordConfirm ? "text" : "password"}`}
                        {...field}
                        className="rounded"
                      />
                    </FormControl>
                    {/* <FormControl
                      onClick={() => setIsShowPasswordConfirm((pre) => !pre)}
                      className="absolute right-2 top-2 items-center justify-items-center text-main hover:opacity-85"
                    >
                      {!isShowPasswordConfirm ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </FormControl> */}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="policyAccept"
              render={({ field }) => (
                <FormItem className="flex gap-x-2 start-0 ">
                  <Input
                    type="checkbox"
                    {...field}
                    className="w-4 cursor-pointer"
                  />
                  <FormLabel className="text-main text-xs  ">
                    <div>
                      <div className="inline">
                        By creating an account, you agree to our
                      </div>
                      <Link
                        to={"/"}
                        className="font-semibold text-indigo-700 underline"
                      >
                        Terms & Condition and Privacy Policy
                      </Link>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded text-white w-full">
              Create account
            </Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex text-xs gap-1 py-2">
          <div className="text-main">Already have an account?</div>
          <Link to={"/sign-in"} className="text-purple-900 font-bold">
            Sign in
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
      </CardFooter>
    </Card>
  );
};

export default Register;
