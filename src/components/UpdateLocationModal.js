import React, {Component} from "react";
import {Button, Modal, Form, Navbar, NavDropdown, Table, Col, Container, Accordion, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import client from "../api";
import {forEach} from "react-bootstrap/ElementChildren";
import {Row} from "react-bootstrap";

export class UpdateLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, date: "", buildings: [], floors: [], desks: {}}
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }


    updateDesks = (e, floorId) => {
        let desks = this.state.desks
        desks[floorId] = e.target.value
        this.setState({desks: desks})
    }

    updateFloors = (e, floorId) => {
        e.preventDefault()
        // TODO: make http request to update the desks
        // client.updateDesks({floorId, desks: this.state.desks[floorId]})
    }

    handleBuildingChange = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let buildingId = e.target.options[selectedIndex].getAttribute('data-key')
        client.getFloors({buildingId}).then(res => {
            this.setState({floors: res.data})
        }).then(() => {
            let temp = {}
            this.state.floors.forEach(floor => {
                client.getDesks(floor.id).then(res => {
                    let temp2 = []
                    res.data.forEach(desk => {
                        temp2.push(desk.deskNumber)
                    })
                    temp[floor.id] = temp2.join(", ")
                    this.setState({desks: temp})
                })
            })
        })
    }

    componentDidMount() {
        client.getBuildings().then(res => {
            this.setState({buildings: res.data})
        })
    }

    render() {
        // this is just a sample, using bootstrap react, change as needed
        return (
            <div className="admin-modal">
                <button className="btn btn-info" onClick={this.handleOpen}> Update Locations</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="modalSummary.buildingSelect">
                            <Form.Label>Select a building</Form.Label>
                            <Form.Control as="select" onChange={this.handleBuildingChange}>
                                <option disabled selected value> -- select one --</option>
                                {this.state.buildings.map((building) =>
                                    <option key={building.id} data-key={building.id}>
                                        {building.name} </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Accordion>
                            {this.state.floors.map((floor, index) =>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={floor.id}>
                                            Floor {floor.floorNumber}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={floor.id}>
                                        <Card.Body>
                                            <Form.Group as={Col}>
                                                <Form.Control as="textarea"
                                                              onChange={(e) => {
                                                                  this.updateDesks(e, floor.id)
                                                              }} rows={5} key={floor.id}
                                                              defaultValue={this.state.desks[floor.id]}/>
                                            </Form.Group>

                                            <Button onClick={(e) => {
                                                this.updateFloors(e, floor.id)
                                            }} type="submit" className="mb-2">
                                                Update
                                            </Button>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )}

                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}