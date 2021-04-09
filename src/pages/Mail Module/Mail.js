import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";
import 'react-notifications/lib/notifications.css';
import ViewRequests from "../../components/Mail Module/ViewRequests";

export class Mail extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <ViewRequests adminView={false}/>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Mail);