import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../api";


export class AddLocationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false, show_floor: false, BuildingName: "", BuildingAddress: "",
            howSuccessPopup: false}
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if ((this.state.BuildingAddress || this.state.BuildingName) === ""){
            return;
        }

        const payload = {
            name: this.state.BuildingName,
            address:this.state.BuildingAddress
        }

        client.addBuilding(payload).then(res => {
        });
        this.handleOpenConfirmation()
    };

    handleShow = (e) => {
        this.setState({show:true})
    }

    handleClose = (e) => {
        this.setState({show:false})
    }


    setBuilding = (e) => {
        this.setState({...this.state, BuildingName: e.target.value})
        console.log("Building Set")
        console.log(this.state.BuildingName);
    }

    setBuildingAddress = (e) => {
        this.setState({...this.state, BuildingAddress: e.target.value})
        console.log("BuildingAddress Set")
        console.log(this.state.BuildingAddress);
    }

    handleOpenConfirmation = () => {
        this.setState({showSuccessPopup: true})
    }

    handleCloseConfirmation = () => {
        this.setState({showSuccessPopup: false})
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

                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Container fluid>
                                <h1>Add Location </h1>
                                <Form.Group controlId="formGridBuilding">
                                    <Form.Label>Building Name</Form.Label>
                                    <Form.Control type= "text" onChange={this.setBuilding} placeholder="Enter building name"/>
                                </Form.Group>

                                <Form.Group  controlId="formGridBuildingAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type = "text" onChange={this.setBuildingAddress} placeholder="Enter address"/>
                                </Form.Group>
                                <Button variant = "primary" type="submit">Add</Button>
                            </Container>
                        </Form>
                    </ModalBody>
                    <Modal show={this.state.showSuccessPopup} onHide={this.handleCloseConfirmation}>
                        <Modal.Header closeButton>
                            <Col>
                                <Modal.Header row>Add Location</Modal.Header>
                                <Modal.Body row>
                                    <p>Added "{this.state.BuildingName}" building
                                        at "{this.state.BuildingAddress}".</p>
                                </Modal.Body>
                            </Col>
                        </Modal.Header>
                    </Modal>
                </Modal>
            </div>);
    }
}


export default connect(
    null,
    null
)(AddLocationModal)