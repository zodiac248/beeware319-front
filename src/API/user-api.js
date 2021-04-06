import {authProvider} from "../Auth/authProvider";
import store from "../store";
import {AuthenticationActions} from "react-aad-msal";
import axios from "axios";
import {InteractionRequiredAuthError} from "msal";

export default class userClient {
    static getAccessToken() {
        let request = {
            scopes: ["User.ReadBasic.All"]
        };
        authProvider.acquireTokenSilent(request).then(accessToken => {
            store.dispatch({type: AuthenticationActions.AcquiredAccessTokenSuccess, payload: accessToken.accessToken})
        }).catch(e => {
            if (e instanceof InteractionRequiredAuthError) {
                authProvider.acquireTokenPopup(request).then(accessToken => {
                    store.dispatch({type: AuthenticationActions.AcquiredAccessTokenSuccess, payload: accessToken.accessToken})
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    }

    static async getAllUsers() {

        let accessToken =  store.getState().auth.accessToken
        try {
            let res = await axios.get("https://graph.microsoft.com/v1.0/users", {headers: {Authorization: `Bearer ${accessToken}`}})
            return res.data.value
        } catch (e) {
            console.log(e)
        }
    }

    static async getUserByEmail(email) {
        let accessToken =  store.getState().auth.accessToken
        try {
            let res = await axios.get("https://graph.microsoft.com/v1.0/users", {headers: {Authorization: `Bearer ${accessToken}`},
                params:{$filter: `startswith(userPrincipalName,\'${email}\')`}})
            return res.data.value
        } catch (e) {
            console.log(e)
        }
    }

}

