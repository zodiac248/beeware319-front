import React, {useEffect} from 'react';
import App from './App';
import User from './pages/Booking Module/User'
import {Route, Switch} from 'react-router-dom';
import Booking from "./pages/Booking Module/Booking";
import Social from "./pages/Social Module/Social";
import {AdminBooking} from "./pages/Booking Module/AdminBooking";
import {connect} from "react-redux";
import ViewBookings from "./pages/Booking Module/ViewBookings";
import "./App.css"
import {AdminSocial} from "./pages/Social Module/AdminSocial";
import ManageRequests from "./pages/Mail Module/Mail";
import AdminMail from "./pages/Mail Module/AdminMail";
import {NotificationContainer} from "react-notifications";

export const Routes = (props) => {

        return (
            props.accessToken &&
            <div>
                <NotificationContainer/>
                <Switch>
                    <Route exact path="/">
                        < App/>
                    </Route>
                    <Route exact path="/user">
                        < User/>
                    </Route>
                    <Route exact path="/booking">
                        < Booking/>
                    </Route>
                    <Route exact path="/mybookings">
                        < ViewBookings/>
                    </Route>
                    <Route exact path="/social">
                        < Social/>
                    </Route>
                    <Route exact path="/mail">
                        < ManageRequests/>
                    </Route>
                </Switch>
                {props.isAdmin &&
                <Switch>
                    <Route exact path="/admin/booking">
                        < AdminBooking/>
                    </Route>
                    <Route exact path="/admin/social">
                        < AdminSocial/>
                    </Route>
                    <Route exact path="/admin/mail">
                        < AdminMail/>
                    </Route>
                </Switch>
                }
            </div>
        )
    }
;

function mapStateToProps(state) {
    const {auth} = state
    return {isAdmin: auth.isAdmin, accessToken: auth.accessToken}
}

export default connect(
    mapStateToProps,
    null
)(Routes);