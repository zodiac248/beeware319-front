import { combineReducers } from 'redux';
import userReducer from './userSlice'

const appReducer = combineReducers({
    user: userReducer
});

// reset entire state on logout
export const rootReducer = (state, action) => {
    if (action.type === "user/logout") {
        state = undefined
    }
    return appReducer(state, action)
};

export default rootReducer

