import axios from "axios";
import { baseUrl} from "../constants";

export default class bookingClient {
    static async getBuildings() {
        try {
            const response = axios.get(baseUrl + "/building/all", {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
    static async getBuilding(id) {
        try {
            const response = axios.get(baseUrl + "/building", {withCredentials: true, params: {id}} );
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = axios.post(baseUrl + "/building", {name, address}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = axios.put(baseUrl + "/building", {id, name, address}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBuilding(id) {
        try {
            const response = axios.delete(baseUrl + "/building", {withCredentials: true, params: {id}});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloors({buildingId}) {
        try {
            const response = axios.get(baseUrl + "/floor", {withCredentials: true, params: {buildingId}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = axios.get(baseUrl + "/floor/info", {withCredentials: true, params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = axios.post(baseUrl + "/floor", {floorNumber, buildingId, deskIds}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = axios.put(baseUrl + "/floor", {id, floorNumber, buildingId}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFloor(id) {
        try {
            const response = axios.delete(baseUrl + "/floor", {withCredentials: true, params: {id}});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getDesks(floorID) {
        try {
            const response = axios.get(baseUrl + "/desk", {withCredentials: true, params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateDesks({id, floorNumber, deskNumbers}) {
        try {
            const response = axios.put(baseUrl + "/floor", {id, floorNumber, deskNumbers}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async makeBooking({employeeId, deskId, date}) {
        try {
            const response = axios.post(baseUrl + "/booking", {employeeId, deskId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBooking({id, deskId, employeeId, date}) {
        try {
            const response = axios.put(baseUrl + "/booking", {id, deskId, employeeId, date}, {withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getBookings({email}) {
        try {
            const response = axios.get(baseUrl + "/booking/email", {params: {email}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }


    static async deleteBooking({id}) {
        try {
            const response = axios.delete(baseUrl + "/booking", {params: {id}, withCredentials: true});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}
