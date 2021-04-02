import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationBar from "../../components/General/NavigationBar";

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
    const {auth} = state
    return {isLoggedIn: auth.isLoggedIn, isAdmin: auth.isAdmin, fName: auth.fName, lName: auth.lName}
}

export default connect(
    mapStateToProps,
    null
)(User);

