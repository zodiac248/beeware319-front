import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";
import ViewRequests from "../../components/Mail Module/ViewRequests";
import AddMailModal from "../../components/Mail Module/AddMailModal";

export class ManageRequests extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <NotificationContainer/>
                <AddMailModal />
                <ViewRequests adminView={true}/>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(ManageRequests);