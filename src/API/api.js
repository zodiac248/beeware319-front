import bookingClient from "./booking-api";
import socialClient from "./social-api";
import userClient from "./user-api";
import mailClient from "./mail-api";

export default class client {
    static user = userClient
    static booking = bookingClient
    static social = socialClient
    static mail = mailClient
}