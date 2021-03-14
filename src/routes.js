import React from 'react';
import App from './App';
import User from './pages/User'
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import Booking from "./pages/Booking";
import {AdminBooking} from "./pages/AdminBooking";
import store from "./store";
import {getUserInfo} from "./reducers/userSlice";
import {connect} from "react-redux";


export const Routes = (props) => {
    props.getUserInfo()
    return (
        <
            div>
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
                        <Route exact path="/admin/booking">
                            < AdminBooking/>
                        </Route>
                    </Switch>
                    :
                    <span>Please <a href="https://localhost:8080"> Login </a></span>
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