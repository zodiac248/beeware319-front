import React, {Component} from 'react';
import NavigationBar from "../../components/General/NavigationBar";
import {FloorSummaryModal} from "../../components/Booking Module/FloorSummaryModal";
import {UpdateFloorsModal} from "../../components/Booking Module/UpdateFloorsModal";
import ManageBuildingsModal from "../../components/Booking Module/ManageBuildingsModal";
import './AdminBooking.page.css';

export class AdminBooking extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>

                <h2> ADMIN BOOKING ACTIONS </h2>
                <div className="admin-modal-container">
                    <ManageBuildingsModal />
                    <UpdateFloorsModal />
                    <FloorSummaryModal />
                </div>
            </div>
        );
    }

}

