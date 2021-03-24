import axios from "axios";
import {baseUrl} from "../constants";

export default class socialClient {
    static async addTopic({name}) {
        try {
            const response = axios.post(baseUrl + "/topic", {name}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    // Posts
    static async getAllPostings() {
        try {
            const response = axios.get(baseUrl + "/posting", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getPostByTopic({topicId}) {
        try {
            const response = axios.get(baseUrl + "/posting/byTopic", {params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getPost({id}) {
        try {
            const response = axios.get(baseUrl + "/posting/id", {params: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deletePosting({id}) {
        try {
            const response = axios.delete(baseUrl + "/posting", {data: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async likePosting({id}) {
        try {
            const response = axios.put(baseUrl + "/posting/like", {id}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    // Topics
    static async getTopics() {
        try {
            const response = axios.get(baseUrl + "/topic", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    // Subscriptions
    static async addNewSubscription({email, topicId}) {
        try {
            const response = axios.post(baseUrl + "/subscription",{email, topicId}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteSubscription({id}) {
        try {
            const response = axios.delete(baseUrl + "/subscription", {data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getSubscriptionsByEmail({email}) {
        try {
            const response = axios.get(baseUrl + "/subscription",{params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getSubscriptionByTopic({topicId}) {
        try {
            const response = axios.get(baseUrl + "/subscription/byTopic",{params: {topicId}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    // Notifications
    static async deleteNotification({id}) {
        try {
            const response = axios.delete(baseUrl + "/notification", {data: {id}, withCredentials: true})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getNotificationsByEmail({email}) {
        try {
            const response = axios.get(baseUrl + "/notification",{params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}
