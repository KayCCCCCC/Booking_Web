import { createSlice } from "@reduxjs/toolkit"

const DestinationSlice = createSlice({
  name: "destination",
  initialState: {
    listPlace: []
  },
  reducers: {
    saveListPlace: (state, action) => {
      state.listPlace = action.payload
    }
  }
})

export default DestinationSlice.reducer
export const { saveListPlace } = DestinationSlice.actions
