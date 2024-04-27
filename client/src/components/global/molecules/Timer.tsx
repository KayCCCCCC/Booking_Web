import { useTime } from "@/lib/utils/useTime"
import { useEffect, useState } from "react"

const Timer = ({ time }: { time: string }) => {
  const [timeAgo, setTimeAgo] = useState<string>("")
  useEffect(() => {
    const getTime = () => {
      const newTime = useTime(time)
      setTimeAgo(newTime)
    }
    getTime()
    const interval = setInterval(getTime, 60000)
    return () => clearInterval(interval)
  }, [time])
  return <div className="">{timeAgo}</div>
}

export default Timer
