import React from "react";
import {Button, Form, Container, ModalBody, Modal, Alert} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";


export class AddLocationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, buildingName: "", buildingAddress: "", showConfirmation: false}
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if ((this.state.buildingAddress || this.state.buildingName) === "") {
            return;
        }

        const payload = {
            name: this.state.buildingName,
            address: this.state.buildingAddress
        }

        client.booking.addBuilding(payload).then(res => {
            this.handleOpenConfirmation()
        });
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

    handleOpenConfirmation = () => {
        this.setState({showConfirmation: true})
    }

    handleCloseConfirmation = () => {
        this.setState({showConfirmation: false})
    }

    renderSuccessMessage() {
        if (this.state.showConfirmation) {
            return (
                <Alert variant="success" onClose={this.handleCloseConfirmation} dismissible>
                    <p>{this.state.buildingName} was added successfully!</p>
                </Alert>
            );
        }
    }

    render() {
        return (
            <div className="admin-modal">
                <button className="btn btn-info" onClick={this.handleShow}>
                    Add Location
                </button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location</Modal.Title>
                    </Modal.Header>
                    {this.renderSuccessMessage()}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Container fluid>
                                <h1>Add Location </h1>
                                <Form.Group controlId="formGridBuilding">
                                    <Form.Label>Building Name</Form.Label>
                                    <Form.Control type="text" onChange={this.setBuilding}
                                                  placeholder="Enter building name"/>
                                </Form.Group>

                                <Form.Group controlId="formGridbuildingAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" onChange={this.setBuildingAddress}
                                                  placeholder="Enter address"/>
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