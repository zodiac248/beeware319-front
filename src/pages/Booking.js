import React, {Component} from 'react';
import {useDispatch, useSelector, connect} from 'react-redux';
import NavigationBar from "../components/NavigationBar";
import styles from './User.page.css'
import {FloorSummaryModal} from "../components/FloorSummaryModal";
import {UpdateLocationModal} from "../components/UpdateLocationModal";

export class Booking extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                < NavigationBar/>
                <div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state) {
    const {user} = state
    return {uid: user.uid, isLoggedIn: user.isLoggedIn}
}

export default connect(
    mapStateToProps,
    null
)(Booking);

