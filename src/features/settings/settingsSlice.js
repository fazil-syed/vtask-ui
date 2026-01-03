import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
};
const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setLightTheme(state) {
      state.mode = "light";
    },
    setDarkTheme(state) {
      state.mode = "dark";
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export default settingsSlice.reducer;

// Action creators are generated for each case reducer function
export const { setLightTheme, setDarkTheme, toggleTheme } =
  settingsSlice.actions;
