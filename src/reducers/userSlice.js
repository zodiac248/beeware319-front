// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import client from "../API/api";
// import {roles} from "../constants";
//
// export const getUserInfo = createAsyncThunk(
//     'user/getInfo',
//     async () => {
//         const response = await client.user.getUserInfo()
//         return response.data
//     }
// )
//
// export const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         isLoggedIn: false,
//         isAdmin: false,
//         username: "",
//         fName: "",
//         lName: "",
//         email: ""
//     },
//     reducers: {
//     },
//     // Reducers for after async thunk actions are fulfilled
//     extraReducers: {
//         [getUserInfo.fulfilled]: (state, action) => {
//             state.isLoggedIn = action.payload.authenticated
//             state.isAdmin = action.payload.principal.claims.roles.includes(roles.admin)
//             state.username = action.payload.name
//             state.fName = action.payload.principal.givenName
//             state.lName = action.payload.principal.familyName
//             state.email = action.payload.principal.attributes.unique_name
//         },
//     }
// });
//
// export default userSlice.reducer;
//
