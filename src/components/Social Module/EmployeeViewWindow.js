import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-bootstrap";
import EmployeeSidebar from "./EmployeeSidebar";
import {EMPLOYEE_VIEWS} from "../../constants";

export class EmployeeViewWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {currView: Object.keys(EMPLOYEE_VIEWS)[0], allTopics: [], content: []}
    }

    viewStyles = {
        minHeight: '100vh'
    }


    handleCurrentView = (key) => {
        this.setState({currView: key})
    }

    render() {
        return (
            <Row style={this.viewStyles}>
                <Col sm={3}>
                    <EmployeeSidebar
                        handleCurrentView={this.handleCurrentView}
                    />
                </Col>
                <Col sm={8}>
                    <h2>{EMPLOYEE_VIEWS[this.state.currView].title}</h2>
                    {EMPLOYEE_VIEWS[this.state.currView].component}
                </Col>
            </Row>
        )
    }
}

export default connect(
    null,
    null
)(EmployeeViewWindow);