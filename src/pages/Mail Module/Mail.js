import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";
import ViewRequests from "../../components/Mail Module/ViewRequests";

export class Mail extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <NotificationContainer/>
                <ViewRequests adminView={false}/>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Mail);