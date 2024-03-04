import ConfirmOTP from "@/components/SignUp/ConfirmOTP";
import Register from "@/components/SignUp/Register";
// import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import CarouselCustom from './../components/SignUp/CarouselCustom';
import { CarouselItems } from "@/components/SignUp/CarouselItem";
const SignUpPage = () => {
  const [process, setProcess] = useState<number>(0);
  const registerSuccess = useCallback(() => {
    setProcess(33);
  }, []);
  const confirmOTPSuccess = useCallback(() => {
    setProcess(67);
  }, []);
  return (
    <div className=" flex  ">
      <div className="w-1/2 flex ">
        <CarouselCustom items={CarouselItems}/>
      </div>
      <div className="w-1/2 bg-secondary min-h-[100vh] items-center justify-center flex">
        {process === 0 && <Register success={registerSuccess} />}
        {process === 33 && <ConfirmOTP success={confirmOTPSuccess} />}
      </div>
    </div>
  );
};

export default SignUpPage;
