import React, {Component} from 'react';
import {useDispatch, useSelector, connect} from 'react-redux';
import NavigationBar from "../components/NavigationBar";
import styles from './User.page.css'
import {FloorSummaryModal} from "../components/FloorSummaryModal";
import {UpdateLocationModal} from "../components/UpdateLocationModal";
import style from "./AdminBooking.page.css"
import {AddLocationModal} from "../components/AddLocationModal";

export class AdminBooking extends Component {
    constructor(props) {
        super(props);
    }

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

