import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";
import BookLocationForm from "../../components/Booking Module/BookLocationForm";

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

export default connect(
    null,
    null
)(Booking);

