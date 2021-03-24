import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/Booking Module/NavigationBar";

export class Booking extends Component {
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

