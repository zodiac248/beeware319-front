import React from 'react';
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


export const Routes = (props) => {
    return (
        <div>
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
                <Route exact path="/social">
                    < Social/>
                </Route>
                <Route exact path="/mybookings">
                    < ViewBookings/>
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
                </Switch>
            }
        </div>
    )
}
;
function mapStateToProps(state) {
    const {auth} = state
    return {isAdmin: auth.isAdmin}
}

export default connect(
    mapStateToProps,
null
)(Routes);