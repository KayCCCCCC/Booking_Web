import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    address: "",
    dateFrom: "",
    dateTo: "",
    quantity: {
      adult: 0,
      child: 0
    }
  },
  reducers: {
    saveReserveInformation: (state, action) => {
      const { address, date, quantity } = action.payload
      console.log(date)

      state.address = address
      state.dateFrom = date?.from ? date?.from.toISOString() : ""
      // state.dateTo = new Date(date?.to).toISOString
      state.quantity.adult = quantity.adult
      state.quantity.child = quantity.child
    }
  }
})
export const { saveReserveInformation } = userSlice.actions
export default userSlice.reducer
