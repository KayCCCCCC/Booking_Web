import { createSlice } from "@reduxjs/toolkit"
const initUser = {
  name: "",
  email: "",
  address: "",
  country: "",
  avatar: "",
  phone: ""
}
const initialAuth = {
  user: initUser,
  token: null,
  error: null,
  isAuthenticated: false,
  loading: false
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    signInRequest: (state) => {
      state.loading = true
    },
    setCredentials: (state, action) => {
      const { data, access_token } = action.payload
      state.user = data.user
      state.token = access_token
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    setToken: (state, action) => {
      const { data, access_token } = action.payload
      state.token = access_token
      state.user.email = data.user.email
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    setInfor: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logOut: (state) => {
      state.user = initUser
      state.token = null
      state.loading = false
      state.error = null
    },
    signUpFirstStep: (state, action) => {
      state.user.email = action.payload
      state.loading = false
      state.error = null
    }
  },
  extraReducers() {}
})
export const { signInRequest, setCredentials, signInFailure, logOut, signUpFirstStep, setToken, setInfor } =
  authSlice.actions
export default authSlice.reducer
// export const selectCurrentUser = (state) => state.auth.user
