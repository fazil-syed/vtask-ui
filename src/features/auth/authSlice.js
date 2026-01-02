import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logInSuccess(state, action) {
      state.isAuthenticated = true;
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    expireToken(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export default authSlice.reducer;

// Action creators are generated for each case reducer function
export const { logInSuccess, logOut, expireToken } = authSlice.actions;
