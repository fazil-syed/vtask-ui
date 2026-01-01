import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/features/tasks/tasksSlice"
import { baseApi } from "../../services/baseApi";
const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    tasks: tasksReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(baseApi.middleware)
})