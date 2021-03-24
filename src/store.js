import {createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from "./reducers/rootReducer";

const store = createStore(appReducer, undefined, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
));

export default store