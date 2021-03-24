import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import client from '../api'
import {roles} from "../constants";
import axios from "axios";

export const getUserInfo = createAsyncThunk(
    'user/getInfo',
    async () => {
        const response = await client.getUserInfo()
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        username: "",
        fName: "",
        lName: "",
        email: ""
    },
    reducers: {
    },
    // Reducers for after async thunk actions are fulfilled
    extraReducers: {
        [getUserInfo.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.isAdmin = true
            state.username = "admin"
            state.fName = "ad"
            state.lName = "min"
            state.email = "test-admin@beeware319.onmicrosoft.com"
        },
    }
});

export default userSlice.reducer;

