import { useEffect, useState } from "react"

type TimerProps = {
  minuteNumber: number
  isResend: boolean
}
const TimeCount = ({ minuteNumber, isResend }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(minuteNumber || 0)
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds - 1)

      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      }
      isResend && clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  })
  return (
    <div>
      {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </div>
  )
}

export default TimeCount
