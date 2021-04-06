import {MsalAuthProvider, LoginType} from 'react-aad-msal';
import client from "../API/api";
const config = {
    auth: {
        authority: "https://login.microsoftonline.com/organizations",
        clientId: "15864755-4d92-416f-885d-20beb599d799",
        postLogoutRedirectUri: "https://beeware319-front.herokuapp.com",
        redirectUri: "https://beeware319-front.herokuapp.com",
        validateAuthority: true,
        navigateToLoginRequestUrl: true,
        storeAuthStateInCookie: false
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    }
}

const authenticationParameters = {
    scopes: [
        "api://7e5767e2-680a-4b9d-8e6e-17097ce6f204/access-api"
    ]
}

const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: 'https://beeware319-front.herokuapp.com/auth.html'
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);

