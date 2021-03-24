import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from "../../components/Booking Module/NavigationBar";
import ManageBookingsForm from "../../components/Booking Module/ManageBookingsForm";

function ViewBookings() {
    return (
        <div>
            <NavigationBar />
            <ManageBookingsForm />
        </div>
    );
}

export default ViewBookings;
