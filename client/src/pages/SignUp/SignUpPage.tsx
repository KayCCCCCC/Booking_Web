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
    </div>
  )
}

export default SignUpPage
