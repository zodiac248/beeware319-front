import React from 'react';
import App from './App';
import User from './pages/Booking Module/User'
import {Route, Switch} from 'react-router-dom';
import Booking from "./pages/Booking Module/Booking";
import Social from "./pages/Social Module/Social";
import {AdminBooking} from "./pages/Booking Module/AdminBooking";
import store from "./store";
import {getUserInfo} from "./reducers/userSlice";
import {connect} from "react-redux";
import ViewBookings from "./pages/Booking Module/ViewBookings";
import {baseUrl} from "./constants";
import "./App.css"
import {AdminSocial} from "./pages/Social Module/AdminSocial";


export const Routes = (props) => {
    props.getUserInfo()
    return (
        <div>
            {
                store.getState().user.isLoggedIn ?
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
                        <Route exact path="/admin/booking">
                            < AdminBooking/>
                        </Route>
                        <Route exact path="/admin/social">
                            < AdminSocial/>
                        </Route>
                    </Switch>
                    :
                    <span>Please <a href={baseUrl}> Login </a></span>
            }
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes);