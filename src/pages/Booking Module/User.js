import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/Booking Module/NavigationBar";

export class User extends Component {
    render() {
        return (
            <div>
                < NavigationBar/>
                <div>
                    <h2> Welcome {this.props.fName} {this.props.lName} </h2>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {user} = state
    return {username: user.username, isLoggedIn: user.isLoggedIn, isAdmin: user.isAdmin, fName: user.fName, lName: user.lName}
}

export default connect(
    mapStateToProps,
    null
)(User);

