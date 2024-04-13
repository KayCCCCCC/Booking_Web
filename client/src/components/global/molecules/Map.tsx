import { useRef, useEffect, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { cn } from "@/lib/utils/cn"
import { DESTINATION_API, HOTEL_API } from "@/constants/API"

interface GeoProps {
  coordinates: maptilersdk.LngLatLike
  type: string
}
interface MapProps {
  isHideHeader: boolean
  // data: Place
  useFor: string
}
const Map = ({ isHideHeader, useFor }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const HCM = { lng: 106.660172, lat: 10.762622 }
  const [zoom] = useState<number>(5)
  maptilersdk.config.apiKey = "DzOrj9foE2FrJob77C4i"
  let endpoint = ""
  if (useFor === "hotel") endpoint = HOTEL_API
  if (useFor === "destination") endpoint = DESTINATION_API

  useEffect(() => {
    if (map.current) return

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [HCM.lng, HCM.lat],
      zoom: zoom
    })

    // map.current!.addSource("rio_cats", {
    //   type: "geojson",
    //   data: geojson
    // })
    map.current!.addLayer({
      id: "rio_cats",
      type: "fill",
      source: "rio_cats",
      layout: {},
      paint: {
        "fill-color": "#98b",
        "fill-opacity": 0.8
      }
    })

    map.current.on("load", async function () {
      const geojson = await maptilersdk.data.get(endpoint)
      geojson.features.forEach((feature) => {
        if (feature.id) {
          const customGeometry = feature.geometry as GeoProps
          new maptilersdk.Marker({ color: "rgb(225,29,72)" }).setLngLat(customGeometry.coordinates).addTo(map.current!)
          const container = document.createElement("div")

          // Render the React JSX element into the div
          // ReactDOM.render(<div>Hhi</div>, container)
          new maptilersdk.Popup({ className: "my-class", offset: 40 })
            .setLngLat(customGeometry.coordinates)
            .setDOMContent(container)
            // .setHTML("&lt;h1&gt;Hello World!&lt;/h1&gt;")
            .setMaxWidth("300px")
            .addTo(map.current!)
        }
      })
    })
    new maptilersdk.Marker({ color: "rgb(225,29,72)", scale: 1.2 }).setLngLat([HCM.lng, HCM.lat]).addTo(map.current!)
  }, [HCM.lng, HCM.lat, zoom])

  return (
    <div
      ref={mapContainer}
      className={cn(
        `fixed bottom-4 h-[530px]  translate-x-full overflow-hidden md:w-2/5 md:translate-x-6`,
        isHideHeader && "-translate-y-8 transform duration-2000 "
      )}
    />
  )
}

export default Map
