import axios from "axios";
import { baseUrl} from "../constants";
import store from "../store";

export default class bookingClient {
    static async getBuildings() {
        try {
            const response = await axios.get(baseUrl + "/building/all");
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }
    static async getBuilding(id) {
        try {
            const response = await axios.get(baseUrl + "/building", {params: {id}} );
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = await axios.post(baseUrl + "/building", {name, address});
            return response
        } catch (e) {
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            };
            return Promise.reject()
        }

    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = await axios.put(baseUrl + "/building", {id, name, address});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

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
            const response = await axios.get(baseUrl + "/floor", {params: {buildingId}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = await axios.get(baseUrl + "/floor/info", {params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = await axios.post(baseUrl + "/floor", {floorNumber, buildingId, deskIds});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, buildingId});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async deleteFloor({id}) {
        try {
            const response = await axios.delete(baseUrl + "/floor", {data: {id}});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getDesks(floorID) {
        try {
            const response = await axios.get(baseUrl + "/desk", {params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async updateDesks({id, floorNumber, deskNumbers}) {
        try {
            const response = await axios.put(baseUrl + "/floor", {id, floorNumber, deskNumbers});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }

            return Promise.reject()
        }
    }

    static async getBookingsByDeskId({deskId}) {
        try {
            const response = await axios.get(baseUrl + "/booking/deskId", {params: {deskId}});
            return response
        } catch (e) {
            console.log(e)
            store.dispatch({type: "error/newError", payload: "Unexpected error, please try again later"})
            return Promise.reject()
        }
    }

    static async makeBooking({deskId, email,  date, range}) {
        try {
            const response = await axios.post(baseUrl + "/booking", {deskId, email,  date, range});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }

    static async getBookings({email}) {
        try {
            const response = await axios.get(baseUrl + "/booking/email", {params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e)
            if (e.response && e.response.hasOwnProperty("data") && e.response.data instanceof String) {
                store.dispatch({type: "error/newError", payload: e.response.data})
            }
            return Promise.reject()
        }
    }


    static async deleteBooking({id}) {
        try {
            const response = await axios.delete(baseUrl + "/booking", {params: {id}, withCredentials: true});
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