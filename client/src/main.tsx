import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store, persistor } from "./store/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./firebase/config.ts"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
)
