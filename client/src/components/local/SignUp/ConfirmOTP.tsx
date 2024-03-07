import React, { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../global/atoms/card"
import { Button } from "../../global/atoms/button"
import Timer from "../../global/molecules/Timer"

interface ConfirmOTPProps {
  success: () => void
  minuteLimit: number
}
let currentOTPIndex: number = 0
const ConfirmOTP = ({ success, minuteLimit }: ConfirmOTPProps) => {
  const [OTP, setOTP] = useState<string[]>(new Array(4).fill(""))
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isResend, setIsResend] = useState<boolean>(false)
  // const [minuteNumber, setMinuteNumber] = useState<number>(minuteLimit);
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    const newOTP: string[] = [...OTP]
    newOTP[currentOTPIndex] = value.substring(value.length - 1)
    !value ? setActiveOTPIndex(currentOTPIndex - 1) : setActiveOTPIndex(currentOTPIndex + 1)
    setOTP(newOTP)
  }
  const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index
    if (key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1)
  }
  const handleResendOTP = () => {
    setIsResend(true)
    console.log(isResend)
  }
  const handleSubmitOTP = () => {}

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex])

  return (
    <Card className="bg-white ">
      <CardHeader>
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-center text-2xl font-bold">Verify your account</CardTitle>
          <CardDescription>Please enter 4 digits code sent to the registered email.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col  items-center">
          <div className="flex items-center justify-center space-x-2">
            {OTP.map((_, index) => (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="number"
                  className="spin-button-none h-12 w-16 rounded border-[1px] border-main bg-transparent
                  text-center text-xl font-semibold text-main outline-none transition 
                  focus:border-gray-700 focus:text-main "
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={OTP[index]}
                />
                {index === OTP.length - 1 ? null : <span className="h-2 w-2 rounded bg-main py-0.5"></span>}
              </React.Fragment>
            ))}
          </div>
          <div className="ml-auto flex gap-x-2 pr-4 pt-2 text-sm">
            <div className="cursor-pointer text-sm text-purple-800" onClick={handleResendOTP}>
              Resend OTP again?
            </div>
            <Timer minuteNumber={minuteLimit} isResend={isResend} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button onClick={handleSubmitOTP} className="w-2/3 rounded text-white">
            Verify
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default ConfirmOTP
