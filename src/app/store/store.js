import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/features/settings/settingsSlice";
import authReducer from "@/features/auth/authSlice";
import { baseApi } from "../../services/baseApi";
import { authListener } from "../../features/auth/authApi";
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  settings: settingsReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authListener.middleware)
      .concat(baseApi.middleware),
});
