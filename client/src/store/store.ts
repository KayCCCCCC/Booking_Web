import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import AuthSlice from "./slices/AuthSlice"
import GlobalSlice from "./slices/GlobalSlice"
import DestinationSlice from "./slices/DestinationSlice"
import HotelSlice from "./slices/HotelSlice"
import UserSlice from "./slices/UserSlice"

const rootReducer = combineReducers({
  auth: AuthSlice,
  global: GlobalSlice,
  place: DestinationSlice,
  hotel: HotelSlice,
  user: UserSlice
})
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // blacklist: ["auth"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER"
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
