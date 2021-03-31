import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import {NotificationManager, NotificationContainer} from "react-notifications";
import EventBus from "../../EventBus";


export class AddLocationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, buildingName: "", buildingAddress: ""}
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

    handleShow = (e) => {
        this.setState({show: true})
    }

    handleClose = (e) => {
        this.setState({show: false})
    }


    setBuilding = (e) => {
        this.setState({...this.state, buildingName: e.target.value, showConfirmation: false})
    }

    setBuildingAddress = (e) => {
        this.setState({...this.state, buildingAddress: e.target.value, showConfirmation: false})
    }

    render() {
        return (
            <div className="admin-modal">
                <NotificationContainer />
                <button className="btn btn-info" onClick={this.handleShow}>
                    Add Location
                </button>

                <Modal show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Container fluid>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Building Name</Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" onChange={this.setBuilding} value={this.state.buildingName}
                                                  placeholder="Enter building name"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label  column sm={3}>Address</Form.Label>
                                    <Col sm={9}>
                                    <Form.Control type="text" value={this.state.buildingAddress} onChange={this.setBuildingAddress}
                                                  placeholder="Enter address"/>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit">Add</Button>
                            </Container>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>);
    }
}


export default connect(
    null,
    null
)(AddLocationModal)
