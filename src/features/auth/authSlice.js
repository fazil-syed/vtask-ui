import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authState: "unknown", // unknown | authenticated | unauthenticated
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    markLoggedOut(state) {
      state.authState = "unauthenticated";
    },
    markLoggedIn(state) {
      state.authState = "authenticated";
    },
  },
});

export default authSlice.reducer;

// Action creators are generated for each case reducer function
export const { markLoggedOut, markLoggedIn } = authSlice.actions;
