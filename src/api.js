import axios from "axios";
import { baseUrl} from "./constants";

export default class client {
    static async getBuildings() {
        try {
            const response = axios.get("/building/all");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
    static async getBuilding(id) {
        try {
            const response = axios.get("/building", {params: {id}} );
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addBuilding({name, address}) {
        try {
            const response = axios.post("/building", {name, address});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBuilding({id, name, address}) {
        try {
            const response = axios.put("/building", {id, name, address});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBuilding(id) {
        try {
            const response = axios.delete("/building", id);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloors({buildingId}) {
        try {
            const response = axios.get("/floor", {params: {buildingId}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFloorInfo(floorID, date) {
        try {
            const response = axios.get("/floor/info", {params: {id: floorID, date: date}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFloor({floorNumber, buildingId, deskIds}) {
        try {
            const response = axios.post("/floor", {floorNumber, buildingId, deskIds});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFloor({id, floorNumber, buildingId}) {
        try {
            const response = axios.put("/floor", {id, floorNumber, buildingId});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFloor(id) {
        try {
            const response = axios.delete("/floor", id);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getDesks(floorID) {
        try {
            const response = axios.get("/desk", {params: {floorId: floorID}})
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async makeBooking({employeeId, deskId, date}) {
        try {
            const response = axios.post("/booking", {employeeId, deskId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateBooking({id, deskId, employeeId, date}) {
        try {
            const response = axios.put("/booking", {id, deskId, employeeId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateDesks({id, deskId, employeeId, date}) {
        try {
            const response = axios.put("/booking", {id, deskId, employeeId, date});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteBooking({id}) {
        try {
            const response = axios.delete("/booking", {id});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getUserInfo() {
        const response = await axios.get("/user/userinfo", {withCredentials: true})
        return response
    }

    static async logout() {
        // stub, should put axios request here
        return Promise.resolve({
            data: {}
        })
    }
}
