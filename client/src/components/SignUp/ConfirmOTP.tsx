import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ConfirmOTPProps {
  success: () => void;
}
const ConfirmOTP = ({ success }: ConfirmOTPProps) => {
  const [OTP, setOTP] = useState<string>("");
  console.log(success);
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
          <CardDescription>Step 2/3</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ConfirmOTP;
