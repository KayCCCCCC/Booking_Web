import { createSlice } from "@reduxjs/toolkit"

const HotelSlice = createSlice({
  name: "Hotel",
  initialState: {
    listHotel: [],
    hotelDetail: {}
  },
  reducers: {
    saveListHotel: (state, action) => {
      state.listHotel = action.payload
    },
    saveHotelDetail: (state, action) => {
      state.hotelDetail = action.payload
    }
  }
})

export default HotelSlice.reducer
export const { saveListHotel } = HotelSlice.actions
