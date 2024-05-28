import ConfirmOTP from "@/components/local/SignUp/ConfirmOTP"
import Register from "@/components/local/SignUp/Register"
import UpdateInformation from "@/components/local/SignUp/UpdateInformation"
import { useCallback, useState } from "react"

const SignUpPage = () => {
  const [status, setStatus] = useState<number>(0)
  const registerSuccess = useCallback(() => {
    setStatus(1)
  }, [])
  const confirmOTPSuccess = useCallback(() => {
    setStatus(2)
  }, [])
  return (
    <div className=" flex  ">
      <div className="bg-slate flex min-h-[100vh] w-1/2 items-center justify-center">
        {status === 0 && <Register success={registerSuccess} />}
        {status === 1 && <ConfirmOTP success={confirmOTPSuccess} minuteLimit={3} />}
        {status === 2 && <UpdateInformation />}
      </div>
      <div className="flex flex-col items-start justify-center  bg-opacity-50 bg-gradient-to-b from-neutral-200 to-neutral-800 bg-clip-text  text-4xl font-bold text-transparent sm:text-center ">
        <div>Unlock your next chapter with </div>
        <img src="/B.svg" alt="" className="w-1/2 p-3" />
        <div>where every page holds a new adventure.</div>
      </div>
    </div>
  )
}

export default SignUpPage
