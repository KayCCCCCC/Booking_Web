import { MapPinIcon } from "lucide-react"

const MapPin = () => {
  return (
    <div className="animate-bounce">
      <MapPinIcon color="blue" fill="blue" size={24}/>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-600 opacity-75"></span>
    </div>
  )
}

export default MapPin
