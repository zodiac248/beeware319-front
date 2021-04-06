import axios from "axios";
import {baseUrl} from "../constants";
import store from "../store";

export default class socialClient {
    static async addTopic({name}) {
        let accessToken =  store.getState().auth.accessToken

        try {
            const response = await axios.post(baseUrl + "/topic", {name}, {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getTopic({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/topic/byId", {headers: {Authorization: `Bearer ${accessToken}`},params: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    // Posts
    static async addPost({email, topicId, title, content}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.post(baseUrl + "/posting", {email, topicId, title, content}, {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)

            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingBySubscriptions({email}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/posting/byEmailSubscriptions",
                {headers: {Authorization: `Bearer ${accessToken}`}, params: {email}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingById({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/posting/id", {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true, params:{id}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }


    static async getPostByTopic({topicId}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/posting/byTopic", {headers: {Authorization: `Bearer ${accessToken}`},params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPost({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/posting/id", {headers: {Authorization: `Bearer ${accessToken}`},params: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deletePosting({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/posting", {headers: {Authorization: `Bearer ${accessToken}`},data: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async likePosting({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.put(baseUrl + "/posting/like", {id}, {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingByEmployee({email}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/posting/byEmail", {headers: {Authorization: `Bearer ${accessToken}`},params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updatePosting({id, title, likes, content}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.put(baseUrl + "/posting", {id, title, likes, content}, {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    // Topics
    static async getTopics() {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/topic", {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    // Subscriptions
    static async addNewSubscription({email, topicId}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.post(baseUrl + "/subscription",{email, topicId}, {headers: {Authorization: `Bearer ${accessToken}`},withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deleteSubscription({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/subscription", {headers: {Authorization: `Bearer ${accessToken}`},data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getSubscriptionsByEmail({email}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/subscription",{headers: {Authorization: `Bearer ${accessToken}`},params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getSubscriptionByTopic({topicId}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/subscription/byTopic",{headers: {Authorization: `Bearer ${accessToken}`},params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    // Notifications
    static async deleteNotification({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/notification", {headers: {Authorization: `Bearer ${accessToken}`},data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getNotificationsByEmail({email}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/notification",{headers: {Authorization: `Bearer ${accessToken}`},params: {email}, withCredentials: true});
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