import axios from "axios";
import { baseUrl} from "../constants";







export default class userClient {
    static async getUser({id}) {
        const response = await axios.get(baseUrl + "/api/user", {id}, {withCredentials: true})
        return response
    }

    static async getUserInfo() {
        const response = await axios.get(baseUrl + "/api/user/userinfo", {withCredentials: true})
        return response
    }

    static async logout() {
        // stub, should put axios request here
        return Promise.resolve({
            data: {}
        })
    }
}
