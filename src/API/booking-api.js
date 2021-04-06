import axios from "axios";
import { baseUrl} from "../constants";
import store from "../store";

export default class bookingClient {
    static async getBuildings() {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/building/all",{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }
    static async getBuilding(id) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/building", {headers: {Authorization: `Bearer ${accessToken}`},params: {id}} );
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }

    static async addBuilding({name, address}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.post(baseUrl + "/building", {name, address},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            };
            return Promise.reject()
        }

    }

    static async updateBuilding({id, name, address}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.put(baseUrl + "/building", {id, name, address},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deleteBuilding({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/building", {headers: {Authorization: `Bearer ${accessToken}`},data: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError",payload: e.response.data})

            return Promise.reject()
        }
    }

    static async getFloors({buildingId}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/floor", {headers: {Authorization: `Bearer ${accessToken}`},params: {buildingId}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getFloorInfo(floorID, date) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/floor/info", {headers: {Authorization: `Bearer ${accessToken}`},params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async addFloor({floorNumber, buildingId, deskNumbers, image}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.post(baseUrl + "/floor", {floorNumber, buildingId, deskNumbers, image},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updateFloor({id, floorNumber, deskNumbers, image}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, deskNumbers, image},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deleteFloor({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/floor", {headers: {Authorization: `Bearer ${accessToken}`},data: {id}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getDesks(floorID) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/desk", {headers: {Authorization: `Bearer ${accessToken}`},params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updateDesks({id, floorNumber, deskNumbers}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, deskNumbers},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async makeBooking({deskId, email,  date, range}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.post(baseUrl + "/booking", {deskId, email,  date, range},{headers: {Authorization: `Bearer ${accessToken}`}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getBookings({email}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.get(baseUrl + "/booking/email", {headers: {Authorization: `Bearer ${accessToken}`},params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && typeof e.response.data === 'string') {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }


    static async deleteBooking({id}) {
        let accessToken =  store.getState().auth.accessToken
        try {
            const response = await axios.delete(baseUrl + "/booking", {headers: {Authorization: `Bearer ${accessToken}`},params: {id}, withCredentials: true});
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
