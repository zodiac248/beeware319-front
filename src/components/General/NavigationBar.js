import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import "./NavigationBar.css"

export class NavigationBar extends Component {
    renderUserNav() {
        return (
            <NavDropdown title={this.props.name} id="basic-nav-dropdown" >
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
                <a href="#" onClick={this.props.logout}> Logout </a>
            </NavDropdown>
        )
    }

    renderAdminNav() {
        return (
            <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/booking">Manage Bookings</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/social">Manage Social</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/mail">Manage Mail Requests</NavDropdown.Item>
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
                        <NavDropdown title="Booking" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/booking">Make Booking</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mybookings">My Bookings</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/social">Social</Nav.Link>
                        <Nav.Link as={Link} to="/mail">Manage Mail/Requests</Nav.Link>
                        {this.props.isAdmin
                        ?this.renderAdminNav()
                        : ""}
                    </Nav>
                    {this.renderUserNav()}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch({type: 'auth/logout'}),
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {name: auth.name, isAdmin: auth.isAdmin, email: auth.email}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);