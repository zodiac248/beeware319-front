import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import styles from "./NavigationBar.css"

export class NavigationBar extends Component {
    renderUserNav() {
        return (
            <NavDropdown title={this.props.username} id="basic-nav-dropdown" >
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
                <a href="http://localhost:8080/logout">Logout</a>
            </NavDropdown>
        )
    }

    renderAdminNav() {
        return (
            <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/booking">Manage Bookings</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Manage Social</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Manage Mail Requests</NavDropdown.Item>
            </NavDropdown>
        )
    }

    render() {
        // this is just a sample, using bootstrap react, change as needed
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">Pandemic Pal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*fill in links when needed*/}
                        <Nav.Link as={Link} to="/booking">Booking System</Nav.Link>
                        <Nav.Link as={Link} to="/">Social</Nav.Link>
                        <Nav.Link as={Link} to="/">Mail Management</Nav.Link>
                        {this.props.isAdmin
                        ? this.renderAdminNav()
                        : ""}
                    </Nav>
                    {this.props.isLoggedIn
                        ? this.renderUserNav()
                        : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


function mapStateToProps(state) {
    const {user} = state
    return {username: user.username, isLoggedIn: user.isLoggedIn, isAdmin: user.isAdmin, fName: user.fName, lName: user.lName}
}

export default connect(
    mapStateToProps,
    null
)(NavigationBar);