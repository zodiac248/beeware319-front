import axios from "axios";
import { baseUrl} from "./constants";

export default class client {
    static async getBuildings() {
        try {
            const response = axios.get("https://beeware319.herokuapp.com/building/all");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
    static async getBuilding(id) {
        try {
            const response = axios.get("https://beeware319.herokuapp.com/building", {withCredentials:true,params: {id}} );
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = axios.post("https://beeware319.herokuapp.com/building", {name, address});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = axios.put("https://beeware319.herokuapp.com/building", {id, name, address});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBuilding(id) {
        try {
            const response = axios.delete("https://beeware319.herokuapp.com/building", id);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloors({buildingId}) {
        try {
            const response = axios.get("https://beeware319.herokuapp.com/floor", {params: {buildingId}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = axios.get("https://beeware319.herokuapp.com/floor/info", {params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = axios.post("https://beeware319.herokuapp.com/floor", {floorNumber, buildingId, deskIds});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = axios.put("https://beeware319.herokuapp.com/floor", {id, floorNumber, buildingId});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFloor(id) {
        try {
            const response = axios.delete("https://beeware319.herokuapp.com/floor", id);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getDesks(floorID) {
        try {
            const response = axios.get("https://beeware319.herokuapp.com/desk", {params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async makeBooking({employeeId, deskId, date}) {
        try {
            const response = axios.post("https://beeware319.herokuapp.com/booking", {employeeId, deskId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBooking({id, deskId, employeeId, date}) {
        try {
            const response = axios.put("https://beeware319.herokuapp.com/booking", {id, deskId, employeeId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateDesks({id, deskId, employeeId, date}) {
        try {
            const response = axios.put("https://beeware319.herokuapp.com/booking", {id, deskId, employeeId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBooking({id}) {
        try {
            const response = axios.delete("https://beeware319.herokuapp.com/booking", {id});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getUserInfo() {
        const response = await axios.get("https://beeware319.herokuapp.com/user/userinfo", {withCredentials: true})
        alert(response)
        return response
    }

    static async logout() {
        // stub, should put axios request here
        return Promise.resolve({
            data: {}
        })
    }
}
