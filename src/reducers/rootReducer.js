import { combineReducers } from 'redux';
import userReducer from './userSlice'
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const appReducer = combineReducers({
    // user: userReducer,
    error: errorReducer,
    auth: authReducer
});

// reset entire state on logout
export const rootReducer = (state, action) => {
    if (action.type === "user/logout") {
        state = undefined
    }
    return appReducer(state, action)
};

export default rootReducer

