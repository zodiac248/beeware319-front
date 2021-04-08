import axios from "axios";
import {baseUrl} from "../constants";
import store from "../store";

export default class mailClient {
    static async addMail({email, buildingId, sender, status}) {
        try {
            const response = await axios.post(baseUrl + "/mail", {email, buildingId, sender, status});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getAllMail() {
        try {
            const response = await axios.get(baseUrl + "/mail/all",  {withCredentials: true});
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
        try {
            const response = await axios.get(baseUrl + "/mail/byEmail",  {params: {email}});
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
        try {
            const response = await axios.get(baseUrl + "/mail/byStatus",  {params: {status}, withCredentials: true});
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
        try {
            const response = await axios.put(baseUrl + "/request/submit", {id, instructionType, instructionDescription, requestedCompletionDate});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async updateMailRequest({id, instructionType, instructionDescription, requestedCompletionDate}) {
        try {
            const response = await axios.put(baseUrl + "/request", {id, instructionType, instructionDescription, requestedCompletionDate});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async updateMail({id, email, sender, status, buildingId}) {
        try {
            const response = await axios.put(baseUrl + "/mail", {id, email, sender, status, buildingId});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async updateAdminMail({id, status, feedback}) {
        try {
            const response = await axios.put(baseUrl + "/request", {id, status, feedback});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }
}