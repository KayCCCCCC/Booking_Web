import ConfirmOTP from "@/components/local/SignUp/ConfirmOTP"
import Register from "@/components/local/SignUp/Register"
import UpdateInformation from "@/components/local/SignUp/UpdateInformation"
import { useCallback, useState } from "react"
// import CarouselCustom from './../components/SignUp/CarouselCustom';
// import { CarouselItems } from "@/components/SignUp/CarouselItem";
const SignUpPage = () => {
  const [status, setStatus] = useState<number>(0)
  const registerSuccess = useCallback(() => {
    setStatus(1)
  }, [])
  const confirmOTPSuccess = useCallback(() => {
    setStatus(2)
  }, [])
  const updateSuccess = useCallback(() => {}, [])
  return (
    <div className=" flex  ">
      {/* <div className="w-1/2 flex ">
        <CarouselCustom items={CarouselItems}/>
      </div> */}
      <div className="flex min-h-[100vh] w-1/2 items-center justify-center bg-secondary">
        {status === 0 && <Register success={registerSuccess} />}
        {status === 1 && <ConfirmOTP success={confirmOTPSuccess} minuteLimit={3} />}
        {status === 2 && <UpdateInformation success={updateSuccess} />}
      </div>
    </div>
  )
}

export default SignUpPage