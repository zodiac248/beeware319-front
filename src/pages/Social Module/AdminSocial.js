import React, {Component} from 'react';
import NavigationBar from "../../components/Booking Module/NavigationBar";
import AddTopicModal from "../../components/Social Module/AddTopicModal";

export class AdminSocial extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>
                <h2> ADMIN SOCIAL ACTIONS </h2>
                <div className="admin-modal-container">
                    <AddTopicModal />
                </div>
            </div>
        );
    }

}

