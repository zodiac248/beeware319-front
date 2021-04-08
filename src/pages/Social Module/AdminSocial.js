import React, {Component} from 'react';
import NavigationBar from "../../components/General/NavigationBar";
import AddTopicModal from "../../components/Social Module/AddTopicModal";
import UpdateTopicsModal from '../../components/Social Module/UpdateTopicsModal';

export class AdminSocial extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>
                <h2> ADMIN SOCIAL ACTIONS </h2>
                <div className="admin-modal-container">
                    <AddTopicModal />
                    <UpdateTopicsModal />
                </div>
            </div>
        );
    }

}

