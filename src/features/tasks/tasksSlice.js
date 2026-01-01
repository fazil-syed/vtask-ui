import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    }
})

export default tasksSlice.reducer

// Action creators are generated for each case reducer function
export const { increment } = tasksSlice.actions