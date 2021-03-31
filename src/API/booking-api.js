import axios from "axios";
import { baseUrl} from "../constants";
import store from "../store";

export default class bookingClient {
    static async getBuildings() {
        try {
            const response = await axios.get(baseUrl + "/building/all", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }
    static async getBuilding(id) {
        try {
            const response = await axios.get(baseUrl + "/building", {withCredentials: true, params: {id}} );
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = await axios.post(baseUrl + "/building", {name, address}, {withCredentials: true});
            return response
        } catch (e) {
            store.dispatch({type: "error/newError", payload: e.response.data});
            return Promise.reject()
        }

    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = await axios.put(baseUrl + "/building", {id, name, address}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async deleteBuilding({id}) {
        try {
            const response = await axios.delete(baseUrl + "/building", {data: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError",payload: e.response.data})

            return Promise.reject()
        }
    }

    static async getFloors({buildingId}) {
        try {
            const response = await axios.get(baseUrl + "/floor", {withCredentials: true, params: {buildingId}})
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = await axios.get(baseUrl + "/floor/info", {withCredentials: true, params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = await axios.post(baseUrl + "/floor", {floorNumber, buildingId, deskIds}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, buildingId}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async deleteFloor(id) {
        try {
            const response = await axios.delete(baseUrl + "/floor", {withCredentials: true, params: {id}});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async getDesks(floorID) {
        try {
            const response = await axios.get(baseUrl + "/desk", {withCredentials: true, params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async updateDesks({id, floorNumber, deskNumbers}) {
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, deskNumbers}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async makeBooking({employeeId, deskId, date}) {
        try {
            const response = await axios.post(baseUrl + "/booking", {employeeId, deskId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async updateBooking({id, deskId, employeeId, date}) {
        try {
            const response = await axios.put(baseUrl + "/booking", {id, deskId, employeeId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }

    static async getBookings({email}) {
        try {
            const response = await axios.get(baseUrl + "/booking/email", {params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }


    static async deleteBooking({id}) {
        try {
            const response = await axios.delete(baseUrl + "/booking", {params: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: e.response.data})

            return Promise.reject()
        }
    }
}