import axios from "axios";
import { baseUrl} from "../constants";

export default class bookingClient {
    static async getBuildings() {
        try {
            const response = axios.get(baseUrl + "/api/building/all", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
    static async getBuilding(id) {
        try {
            const response = axios.get(baseUrl + "/api/building", {withCredentials: true, params: {id}} );
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = axios.post(baseUrl + "/api/building", {name, address}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = axios.put(baseUrl + "/api/building", {id, name, address}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBuilding(id) {
        try {
            const response = axios.delete(baseUrl + "/api/building", {withCredentials: true, params: {id}});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloors({buildingId}) {
        try {
            const response = axios.get(baseUrl + "/api/floor", {withCredentials: true, params: {buildingId}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = axios.get(baseUrl + "/api/floor/info", {withCredentials: true, params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = axios.post(baseUrl + "/api/floor", {floorNumber, buildingId, deskIds}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = axios.put(baseUrl + "/api/floor", {id, floorNumber, buildingId}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFloor(id) {
        try {
            const response = axios.delete(baseUrl + "/api/floor", {withCredentials: true, params: {id}});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getDesks(floorID) {
        try {
            const response = axios.get(baseUrl + "/api/desk", {withCredentials: true, params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateDesks({id, floorNumber, deskNumbers}) {
        try {
            const response = axios.put(baseUrl + "/api/floor", {id, floorNumber, deskNumbers}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async makeBooking({employeeId, deskId, date}) {
        try {
            const response = axios.post(baseUrl + "/api/booking", {employeeId, deskId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBooking({id, deskId, employeeId, date}) {
        try {
            const response = axios.put(baseUrl + "/api/booking", {id, deskId, employeeId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getBookings({email}) {
        try {
            const response = axios.get(baseUrl + "/api/booking/email", {params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }


    static async deleteBooking({id}) {
        try {
            const response = axios.delete(baseUrl + "/api/booking", {params: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}
