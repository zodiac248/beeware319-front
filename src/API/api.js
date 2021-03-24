import bookingClient from "./booking-api";
import socialClient from "./social-api";
import userClient from "./user-api";

export default class client {
    static user = userClient
    static booking = bookingClient
    static social = socialClient

}