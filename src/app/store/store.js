import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/features/tasks/tasksSlice";
import settingsReducer from "@/features/settings/settingsSlice";
import authReducer from "@/features/auth/authSlice";
import { baseApi } from "../../services/baseApi";
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  tasks: tasksReducer,
  settings: settingsReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
