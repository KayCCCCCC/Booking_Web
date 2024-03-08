import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // firstStepSignUp(state, action){}
    addUser(state, action) {},
    // removeUser(state, action) {},
    // deleteUser(state, action) {}
  }
})
export const { addUser } = userSlice.actions
export default userSlice.reducer
