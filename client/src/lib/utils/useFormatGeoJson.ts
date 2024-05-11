import type { FeatureCollection, Feature } from "geojson"
import { Destination } from "../interface/destination.interface"

const useFormatGeoJson = (data: Destination[]): FeatureCollection => {
  const features: Feature[] = []

  if (data.length !== 0) {
    data.forEach((item: Destination) => {
      const feature: Feature = {
        type: "Feature",
        properties: {
          item
        },
        geometry: {
          type: "Point",
          coordinates: [item.longitude, item.latitude]
        }
      }
      features.push(feature)
    })
  } else {
    features.push({
      type: "Feature",
      properties: {
        name: "Hạ Long Bay",
        description:
          "Hạ Long Bay is a UNESCO World Heritage Site and popular tourist destination known for its emerald waters and thousands of towering limestone islands topped with rainforests."
      },
      geometry: {
        type: "Point",
        coordinates: [107.0475, 20.9101]
      }
    })
  }

  return {
    type: "FeatureCollection",
    features: features
  }
}

export default useFormatGeoJson
