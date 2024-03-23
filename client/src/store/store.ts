import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import { composeWithDevTools } from "@redux-devtools/extension"
import storage from "redux-persist/lib/storage"
import AuthSlice from "./slices/AuthSlice"
import GlobalSlice from "./slices/GlobalSlice"

const rootReducer = combineReducers({
  auth: AuthSlice,
  global: GlobalSlice
})
const persistConfig = {
  key: "root",
  storage,
  version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true
    }),
  devTools: true || composeWithDevTools()
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
