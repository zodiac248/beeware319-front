import axios from "axios";
import {baseUrl} from "../constants";
import store from "../store";

export default class mailClient {
    static async addMail({email, buildingId, sender, status}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.post(baseUrl + "/mail", {email, buildingId, sender, status},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getAllMail() {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.get(baseUrl + "/mail/all",
                {headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getMailByEmail({email}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.get(baseUrl + "/mail/byEmail",  {headers: {Authorization: `Bearer ${accessToken}`},params: {email}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getMailByStatus({status}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.get(baseUrl + "/mail/byStatus",
                {headers: {Authorization: `Bearer ${accessToken}`},params: {status}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async addMailRequest({id, instructionType, instructionDescription, requestedCompletionDate}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.put(baseUrl + "/request/submit", {id, instructionType, instructionDescription, requestedCompletionDate},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async updateMailRequest({id, instructionType, instructionDescription, requestedCompletionDate}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.put(baseUrl + "/request", {id, instructionType, instructionDescription, requestedCompletionDate},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async updateAdminMail({id, status, feedback}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.put(baseUrl + "/request", {id, status, feedback},
                {headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async deleteMail({id}) {
        let accessToken =  store.getState().auth.idToken
        try {
            const response = await axios.delete(baseUrl + "/mail",
                {headers: {Authorization: `Bearer ${accessToken}`}, data: {id}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }
}