import { RouterProvider } from "react-router-dom"
import "./App.css"
import router from "./router"
import "mapbox-gl/dist/mapbox-gl.css"
import { useSelector } from "react-redux"
import { RootState } from "./store/store"

function App() {
  const { token } = useSelector((state: RootState) => state.auth)

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
