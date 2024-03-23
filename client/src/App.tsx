import { RouterProvider } from "react-router-dom"
import "./App.css"
import router from "./router"
import "@maptiler/sdk/dist/maptiler-sdk.css"
// import AuthProvider from "./components/global/organisms/context/AuthProvider"

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
