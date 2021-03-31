import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/Booking Module/NavigationBar";
import {BookLocationForm} from "../../components/Booking Module/BookLocationForm";

export class Booking extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>
                <BookLocationForm/>
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

