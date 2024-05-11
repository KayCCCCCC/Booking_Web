import Map, { Marker, NavigationControl, Popup, GeolocateControl, FullscreenControl } from "react-map-gl"
// import type { CircleLayer } from "react-map-gl"
import { useEffect, useRef, useState } from "react"
import MapPin from "../atoms/MapPin"
import { Coordinates } from "@/lib/interface/coordinates.interface"
// import useFormatGeoJson from "@/lib/utils/useFormatGeoJson"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Supercluster from "supercluster"
import { Destination } from "@/lib/interface/destination.interface"
import { MapPinIcon } from "lucide-react"
import { MAP_API_KEY } from "@/constants/API"

type BBox = [number, number, number, number]

const MapCustom = ({ hoverPlace }: { hoverPlace: Coordinates | null }) => {
  // const layerStyle: CircleLayer = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 6,
  //     "circle-color": "#007cbf"
  //   }
  // }
  // const [showPopup, setShowPopup] = useState<boolean>(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { listPlace } = useSelector((state: RootState) => state?.place)
  // const geojson = useFormatGeoJson(listPlace ?? [])
  const [shouldReloadEffect, setShouldReloadEffect] = useState(false)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  const [viewport, setViewport] = useState({
    longitude: hoverPlace?.lng || 0,
    latitude: hoverPlace?.lat || 0,
    zoom: 8
  })

  // clustering

  const [clusters, setClusters] = useState<any[]>([])

  useEffect(() => {
    if (!listPlace || listPlace.length === 0) {
      return
    }

    const supercluster = new Supercluster({
      radius: 50,
      maxZoom: 20
    })

    supercluster.load(
      listPlace.map((place: Destination) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [place.longitude, place.latitude]
        },
        properties: place
      }))
    )
    const timeoutId = setTimeout(() => {
      const bounds = mapRef.current?.getBounds()
      const zoom = mapRef.current?.getZoom()
      const bbox: BBox = bounds
        ? [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
        : [0, 0, 0, 0]

      setClusters(supercluster.getClusters(bbox, Math.floor(zoom ?? 0)))

      const listener = () => {
        const bounds = mapRef.current?.getBounds()
        const zoom = mapRef.current?.getZoom()
        const bbox: BBox = bounds
          ? [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
          : [0, 0, 0, 0]

        setClusters(supercluster.getClusters(bbox, Math.floor(zoom ?? 0)))
      }
      const map = mapRef?.current
      if (map) {
        map.on("move", listener)
      }

      return () => {
        if (map) {
          map.off("move", listener)
        }
      }
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [listPlace])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5
      })
    })
  }, [])

  useEffect(() => {
    if (hoverPlace && mapRef.current) {
      mapRef.current.flyTo({
        center: [hoverPlace.lng, hoverPlace.lat],
        duration: 3000,
        zoom: 10,
        animate: true,
        essential: true
      })
    }
  }, [hoverPlace])
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      setMapLoaded(true)
    }
  }, [mapRef])
  // useEffect(() => {
  //   if (clusters.length === 0) {
  //     setShouldReloadEffect((prevState) => !prevState)
  //   }
  // }, [clusters])
  console.log(clusters, listPlace)

  return (
    <Map
      id="map"
      ref={mapRef}
      initialViewState={viewport}
      mapboxAccessToken={MAP_API_KEY}
      style={{ width: 800, height: 550, borderRadius: 10 }}
      mapStyle="mapbox://styles/hieuservices/clvic447f01b101qv7sti2xt4"
      onLoad={() => setMapLoaded(true)}
      maxZoom={20}
    >
      <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
      {mapLoaded && (
        <>
          {hoverPlace && (
            <>
              <Marker longitude={hoverPlace?.lng} latitude={hoverPlace?.lat} anchor="bottom" key="hoverPlace">
                <MapPin />
              </Marker>
              {/* {showPopup && (
                <Popup
                  longitude={hoverPlace?.lng}
                  latitude={hoverPlace?.lat}
                  anchor="left"
                  onClose={() => setShowPopup(false)}
                >
                  <div className="h-40 w-40 rounded border">
                    <p>You are here</p>
                  </div>
                </Popup>
              )} */}
            </>
          )}
          {clusters.map((cluster, index) => (
            <Marker
              key={index}
              longitude={cluster.geometry.coordinates[0]}
              latitude={cluster.geometry.coordinates[1]}
              anchor="bottom"
            >
              {hoverPlace?.lng !== cluster.geometry.coordinates[0] &&
              cluster.geometry.coordinates[1] !== hoverPlace?.lat ? (
                <MapPinIcon color="blue" fill="blue" size={24} />
              ) : (
                " "
              )}
            </Marker>
          ))}
          {clusters.length === 0 && (
            <div className="absolute top-4 z-20 flex w-full translate-x-[50%] transform">
              <div className="animate-bounce rounded-md bg-slate-100 p-2 text-slate-500">Loading ...</div>
            </div>
          )}
          <NavigationControl />
          <FullscreenControl />
        </>
      )}
    </Map>
  )
}

export default MapCustom
