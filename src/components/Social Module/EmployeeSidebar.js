import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, Navbar} from "react-bootstrap";
import {EMPLOYEE_VIEWS} from "../../constants";
import AddPostModal from "./AddPostModal";

export class EmployeeSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {showAddPostModal: false, showUpdatePostModal: false}
    }

    navbarStyles = {
        top: '100px',
        textAlign: 'left',
        zIndex: 1,
    }

    render() {
        return (
            <Navbar className={"bg-light"} expand="lg" sticky="top" style={this.navbarStyles}>
                <Nav className="flex-column" >
                    <Navbar.Brand>Social</Navbar.Brand>
                    {Object.keys(EMPLOYEE_VIEWS).map((key) => {
                        let currView = EMPLOYEE_VIEWS[key]
                        return (
                            <Nav.Link key={key}
                                      onClick={() => {this.props.handleCurrentView(key)}}>
                                <div>{currView.icon} {currView.title}</div>
                            </Nav.Link>
                        )
                    })}
                    <AddPostModal/>
                </Nav>
            </Navbar>
        )
    }
}

export default connect(
    null,
    null
)(EmployeeSidebar)