import { createSlice } from "@reduxjs/toolkit"

const HotelSlice = createSlice({
  name: "Hotel",
  initialState: {
    listHotel: [],
    hotelDetail: {},
    sessionId: "",
  },
  reducers: {
    saveListHotel: (state, action) => {
      state.listHotel = action.payload
    },
    saveHotelDetail: (state, action) => {
      state.hotelDetail = action.payload
    },
    saveSessionId: (state, action) => {
      state.sessionId = action.payload
    }
  }
})

export default HotelSlice.reducer
export const { saveListHotel, saveHotelDetail, saveSessionId } = HotelSlice.actions
