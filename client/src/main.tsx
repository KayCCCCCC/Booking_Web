import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ApolloProvider } from "@apollo/client/react"
import "./index.css"
import { Provider } from "react-redux"
import { store, persistor, client } from "./store/store.ts"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
