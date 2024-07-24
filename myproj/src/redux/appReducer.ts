import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isInitialized: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setInitialized: (state) => {
            state.isInitialized = true
        }
    }
})

export const {setInitialized} = appSlice.actions

export default appSlice.reducer

