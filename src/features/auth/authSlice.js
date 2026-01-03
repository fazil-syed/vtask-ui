import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedOut: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    markLoggedOut(state) {
      state.isLoggedOut = true;
    },
    markLoggedIn(state) {
      state.isLoggedOut = false;
    },
  },
});

export default authSlice.reducer;

// Action creators are generated for each case reducer function
export const { markLoggedOut, markLoggedIn } = authSlice.actions;
