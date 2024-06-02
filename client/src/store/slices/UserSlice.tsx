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
    },
    paymentNumber: 0,
    paymentTotal: 0
  },
  reducers: {
    saveReserveInformation: (state, action) => {
      const { address, date, quantity } = action.payload

      state.address = address
      state.dateFrom = date?.from?.toISOString()
      state.dateTo = date?.to?.toISOString()

      state.quantity.adult = quantity.adult
      state.quantity.child = quantity.child

    },
    saveInforPayment: (state, action) => {
      state.paymentNumber = action.payload.quantity
      state.paymentTotal = action.payload.total
    }
  }
})
export const { saveReserveInformation, saveInforPayment } = userSlice.actions
export default userSlice.reducer
