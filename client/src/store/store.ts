import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/UserSlice"
import { useDispatch } from "react-redux"
// import { composeWithDevTools } from "redux-devtools-extension"
// import log from "./log"
// import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    users: userSlice
  },
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
  // devTools: true || composeWithDevTools()
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
