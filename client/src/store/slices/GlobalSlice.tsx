import { createSlice } from "@reduxjs/toolkit"
const globalState = {
  isVisibleScrollBack: false
}
const GlobalSlice = createSlice({
  name: "global",
  initialState: globalState,
  reducers: {
    shouldVisibleScrollBack: (state) => {
      state.isVisibleScrollBack = true
    },
    shouldHideScrollBack: (state) => {
      state.isVisibleScrollBack = false
    }
  }
})

export const { shouldHideScrollBack, shouldVisibleScrollBack } = GlobalSlice.actions
export default GlobalSlice.reducer
