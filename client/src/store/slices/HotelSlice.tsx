import { createSlice } from "@reduxjs/toolkit"

const HotelSlice = createSlice({
  name: "Hotel",
  initialState: {
    listHotel: []
  },
  reducers: {
    saveListHotel: (state, action) => {
      state.listHotel = action.payload
    }
  }
})

export default HotelSlice.reducer
export const { saveListHotel } = HotelSlice.actions
