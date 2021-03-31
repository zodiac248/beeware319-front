import { createSlice } from '@reduxjs/toolkit';
import {NotificationManager} from "react-notifications";

export const errorSlice = createSlice({
    name: 'error',
    initialState: {},
    reducers: {
        newError: (state, action) => {
            state.error = action.payload
            NotificationManager.error(action.payload)
        },
    },
});

export const { newError } = errorSlice.actions;

export default errorSlice.reducer;
