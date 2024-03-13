import { createSlice } from "@reduxjs/toolkit"

const initialAuth = {
  user: null ,
  token: null,
  error: null,
  isAuthenticated: false,
  loading: false
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    setCredentials: (state, action) => {
      const { data, token } = action.payload
      state.user = data
      state.token = token
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logOut: (state) => {
      state.user = null
      state.token = null
    },
    signUpFirstStep: (state, action) => {
      state.user = action.payload
    }
    
  },
  extraReducers() {}
})
export const { signInStart, setCredentials, signInFailure, logOut } = authSlice.actions
export default authSlice.reducer
// export const selectCurrentUser = (state) => state.auth.user
