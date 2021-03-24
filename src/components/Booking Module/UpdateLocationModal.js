import React, {Component} from "react";
import {Button, Modal, Form, Col, Accordion, Card} from "react-bootstrap";
import client from "../../API/api";
import {Row} from "react-bootstrap";

export class UpdateLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, date: "", buildings: [], floors: {}, desks: {}}
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }


    updateDesks = (e, floorId) => {
        let floors = this.state.floors
        let floor = this.state.floors[floorId]
        floor.desks = e.target.value
        floors[floorId] = floor
        this.setState({floors: floors})
    }

    updateFloor = (e, floorId) => {
        e.preventDefault()
        const floor = this.state.floors[floorId]
        client.booking.updateDesks({id: floorId, floorNumber: floor.floorNumber, deskNumbers: floor.desks})
            .then(res => {
            })
    }

    updateFloorNum = (e, floorId) => {
        let floors = this.state.floors
        let floor = this.state.floors[floorId]
        floor.floorNumber = e.target.value
        floors[floorId] = floor
        this.setState({floors: floors})
    }

    handleBuildingChange = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let buildingId = e.target.options[selectedIndex].getAttribute('data-key')
        client.booking.getFloors({buildingId}).then(res => {
            let floors = res.data
            let tempFloors = {}
            floors.forEach(floor => {
                client.booking.getDesks(floor.id).then(res => {
                    let temp = []
                    res.data.forEach(desk => {
                        temp.push(desk.deskNumber)
                    })
                    tempFloors[floor.id] = {}
                    tempFloors[floor.id]["desks"] = temp.join(", ")
                    tempFloors[floor.id]["floorNumber"] = floor.floorNumber
                    this.setState({floors: tempFloors})
                })
            })
        })
    }

    componentDidMount() {
        client.booking.getBuildings().then(res => {
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
                            {Object.keys(this.state.floors).map((floorId, index) => {
                                let floor = this.state.floors[floorId]
                                return (
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={floorId}>
                                                Floor {floor.floorNumber}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={floorId}>
                                            <Card.Body>
                                                <Row>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="5">
                                                            Floor No.
                                                        </Form.Label>
                                                        <Col sm="7" key={floorId}>
                                                            <Form.Control onChange={(e) => {
                                                                this.updateFloorNum(e, floorId)
                                                            }} defaultValue={floor.floorNumber}/>
                                                        </Col>
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group as={Col}>
                                                    <Form.Control as="textarea"
                                                                  onChange={(e) => {
                                                                      this.updateDesks(e, floorId)
                                                                  }} rows={5} key={floorId}
                                                                  defaultValue={floor.desks}/>
                                                </Form.Group>

                                                <Button onClick={(e) => {
                                                    this.updateFloor(e, floorId)
                                                }} type="submit" className="mb-2">
                                                    Save
                                                </Button>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })}

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