import { createStore } from '@reduxjs/toolkit';
import { AuthenticationActions, AuthenticationState } from 'react-aad-msal';
import {authProvider} from "../Auth/authProvider";
import {roles} from "../constants";

const initialState = {
    initializing: false,
    initialized: false,
    idToken: null,
    accessToken: null,
    state: AuthenticationState.Unauthenticated,
    name: null,
    isAdmin: false,
    email: ""
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "auth/logout":
            authProvider.logout();
        case AuthenticationActions.Initializing:
            return {
                ...state,
                initializing: true,
                initialized: false,
            };
        case AuthenticationActions.Initialized:
            return {
                ...state,
                initializing: false,
                initialized: true,
            };
        case AuthenticationActions.AcquiredIdTokenSuccess:
            return {
                ...state,
                idToken: action.payload.idToken.rawIdToken,
                name: action.payload.idToken.name,
                email: action.payload.idToken.preferredName,
                isAdmin: action.payload.idToken.claims.roles && action.payload.idToken.claims.roles.includes(roles.admin)
            };
        case AuthenticationActions.AcquiredAccessTokenSuccess:
            return {
                ...state,
                accessToken: action.payload,
            };
        case AuthenticationActions.AcquiredAccessTokenError:
            return {
                ...state,
                accessToken: null,
            };
        case AuthenticationActions.LoginSuccess:
            return {
                ...state,
                account: action.payload.account,
            };
        case AuthenticationActions.LoginError:
        case AuthenticationActions.AcquiredIdTokenError:
        case AuthenticationActions.LogoutSuccess:
            return { ...state, idToken: null, accessToken: null, account: null, isAdmin: false, username: null, name: null };
        case AuthenticationActions.AuthenticatedStateChanged:
            return {
                ...state,
                state: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;