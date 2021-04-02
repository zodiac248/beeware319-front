import axios from "axios";
import {baseUrl} from "../constants";
import store from "../store";

export default class socialClient {
    static async addTopic({name}) {
        try {
            const response = await axios.post(baseUrl + "/topic", {name}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getTopic({id}) {
        try {
            const response = await axios.get(baseUrl + "/topic/byId", {params: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    // Posts
    static async addPost({email, topicId, title, content}) {
        try {
            const response = await axios.post(baseUrl + "/posting", {email, topicId, title, content}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)

            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingBySubscriptions({email}) {
        try {
            const response = await axios.get(baseUrl + "/posting/byEmailSubscriptions",
                {params: {email}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingById({id}) {
        try {
            const response = await axios.get(baseUrl + "/posting/id", {withCredentials: true, params:{id}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }


    static async getPostByTopic({topicId}) {
        try {
            const response = await axios.get(baseUrl + "/posting/byTopic", {params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPost({id}) {
        try {
            const response = await axios.get(baseUrl + "/posting/id", {params: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deletePosting({id}) {
        try {
            const response = await axios.delete(baseUrl + "/posting", {data: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async likePosting({id}) {
        try {
            const response = await axios.put(baseUrl + "/posting/like", {id}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getPostingByEmployee({email}) {
        try {
            const response = await axios.get(baseUrl + "/posting/byEmail", {params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updatePosting({id, title, likes, content}) {
        try {
            const response = await axios.put(baseUrl + "/posting", {id, title, likes, content}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    // Topics
    static async getTopics() {
        try {
            const response = await axios.get(baseUrl + "/topic", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    // Subscriptions
    static async addNewSubscription({email, topicId}) {
        try {
            const response = await axios.post(baseUrl + "/subscription",{email, topicId}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deleteSubscription({id}) {
        try {
            const response = await axios.delete(baseUrl + "/subscription", {data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getSubscriptionsByEmail({email}) {
        try {
            const response = await axios.get(baseUrl + "/subscription",{params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getSubscriptionByTopic({topicId}) {
        try {
            const response = await axios.get(baseUrl + "/subscription/byTopic",{params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    // Notifications
    static async deleteNotification({id}) {
        try {
            const response = await axios.delete(baseUrl + "/notification", {data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getNotificationsByEmail({email}) {
        try {
            const response = await axios.get(baseUrl + "/notification",{params: {email}, withCredentials: true});
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