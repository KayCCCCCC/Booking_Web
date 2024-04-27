import { RouterProvider } from "react-router-dom"
import "./App.css"
import router from "./router"
import "mapbox-gl/dist/mapbox-gl.css"

function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </div>
  )
}

export default App
