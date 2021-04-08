import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";
import ViewRequests from "../../components/Mail Module/ViewRequests";
import AddMailModal from "../../components/Mail Module/AddMailModal";
import AdminFeedbackModal from "../../components/Mail Module/AdminFeedbackModal";

export class ManageRequests extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <NotificationContainer/>
                <ViewRequests adminView={true}/>
                <AddMailModal />
            </div>
        );
    }
}

export default connect(
    null,
    null
)(ManageRequests);