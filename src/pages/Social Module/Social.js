import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from 'react-bootstrap';
import NavigationBar from "../../components/Booking Module/NavigationBar";
import EmployeeViewWindow from "../../components/Social Module/EmployeeViewWindow";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";

export class Social extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <NotificationContainer/>
                <Container fluid>
                    <EmployeeViewWindow/>
                </Container>
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
)(Social);