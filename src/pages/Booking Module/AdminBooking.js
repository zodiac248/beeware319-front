import React, {Component} from 'react';
import NavigationBar from "../../components/General/NavigationBar";
import {FloorSummaryModal} from "../../components/Booking Module/FloorSummaryModal";
import {UpdateLocationModal} from "../../components/Booking Module/UpdateLocationModal";
import {AddLocationModal} from "../../components/Booking Module/AddLocationModal";
import './AdminBooking.page.css';

export class AdminBooking extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>

                <h2> ADMIN BOOKING ACTIONS </h2>
                <div className="admin-modal-container">
                    <FloorSummaryModal />
                    <UpdateLocationModal />
                    <AddLocationModal />
                </div>
            </div>
        );
    }

}

