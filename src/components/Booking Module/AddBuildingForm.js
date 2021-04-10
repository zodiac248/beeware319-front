import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import {NotificationManager} from "react-notifications";
import EventBus from "../../EventBus";


export class AddBuildingForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, buildingName: "", buildingAddress: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.buildingAddress === "" || this.state.buildingName === "") {
            NotificationManager.error("Please fill in all fields", "", 2000)
            return;
        }
        const payload = {
            name: this.state.buildingName,
            address: this.state.buildingAddress
        }
        client.booking.addBuilding(payload).then(res => {
            NotificationManager.success(this.state.buildingName + " successfully added", "", 2000)
            EventBus.dispatch("buildingAddDelete", null)
            this.setState({buildingName: "", buildingAddress: ""})
        })
    };

    setBuilding = (e) => {
        this.setState({buildingName: e.target.value})
    }

    setBuildingAddress = (e) => {
        this.setState({buildingAddress: e.target.value})
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Building Name</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" onChange={this.setBuilding} value={this.state.buildingName}
                                      placeholder="Enter building name"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Address</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" value={this.state.buildingAddress}
                                      onChange={this.setBuildingAddress}
                                      placeholder="Enter address"/>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Add</Button>
            </Form>
        )
    }
}


export default connect(
    null,
    null
)(AddBuildingForm)
