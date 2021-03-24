import React, {Component} from "react";
import {connect} from "react-redux";
import {Dropdown, Nav, Navbar, NavItem, NavLink} from "react-bootstrap";
import {EMPLOYEE_VIEWS} from "../../constants";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";

export class EmployeeSidebar extends Component {
    navbarStyles = {
        top: '100px',
        textAlign: 'left',
        zIndex: 1,
    }

    subNav = [
        {
            title: "Create Post",
            path: "/manage/posts/add",
            icon: <BiIcons.BiAddToQueue/>
        },
        {
            title: "Edit Post",
            path: "/manage/posts/edit",
            icon: <HiIcons.HiPencilAlt/>
        }
    ]

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
                <Dropdown as={NavItem} drop={"right"}>
                    <Dropdown.Toggle
                        as={NavLink}>
                        <AiIcons.AiOutlineSetting /> Manage Posts
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.subNav.map((val, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}

                                >
                                    {val.title}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
            </Navbar>
        )
    }
}

export default connect(
    null,
    null
)(EmployeeSidebar)