import React, {Component} from "react";
import {Button, Modal, Form, Col, Accordion, Card} from "react-bootstrap";
import client from "../../API/api";
import {Row} from "react-bootstrap";
import {NotificationManager, NotificationContainer} from "react-notifications";
import EventBus from "../../EventBus";

export class UpdateLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, date: "", buildings: [], floors: {}, desks: {}, currentBuildingId: null, newFloorNum: ""}
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    handleNewFloorChange = (e) => {
        this.setState({newFloorNum: e.target.value})
    }

    addFloor = (e) => {
        const floorNumber = this.state.newFloorNum
        if (floorNumber === "") {
            NotificationManager.error("Please fill in a floor number")
        } else {
            client.booking.addFloor({floorNumber: floorNumber,
                buildingId: this.state.currentBuildingId, deskIds: ""}).then(() => {
                    this.setState({newFloorNum: ""})
                    this.getFloors()
            })
        }
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
                NotificationManager.success("Saved")
            })
    }

    deleteFloor = (e, floorId) => {
        e.preventDefault()
        const floors = this.state.floors
        client.booking.deleteFloor({id: floorId})
            .then(res => {
                delete floors[floorId]
                this.setState({floors: floors})
            })
    }

    deleteBuilding = (e) => {
        e.preventDefault()
        client.booking.deleteBuilding({id: this.state.currentBuildingId})
            .then(res => {
                NotificationManager.success("Building successfully deleted")
                this.setState({currentBuildingId: null})
                this.getBuildings()
                EventBus.dispatch("buildingAddDelete", null)
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
        this.setState({currentBuildingId: buildingId}, this.getFloors)
    }
    
    getBuildings = () => {
        client.booking.getBuildings().then(res => {
            this.setState({buildings: res.data})
        })
    }

    getFloors = () => {
        client.booking.getFloors({buildingId: this.state.currentBuildingId}).then(res => {
            let floors = res.data
            let tempFloors = {}
            if (floors.length === 0) {
                this.setState({floors: {}})
                return;
            }
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
        this.getBuildings();
        EventBus.on("buildingAddDelete", (data) => {
            this.getBuildings()
        })
    }

    componentWillUnmount() {
        EventBus.remove("buildingAddDelete");
    }

    render() {
        return (
            <div className="admin-modal">
                <NotificationContainer />
                <button className="btn btn-info" onClick={this.handleOpen}> Update Locations</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Select a building</Form.Label>
                            <Form.Control as="select" onChange={this.handleBuildingChange}>
                                <option disabled selected> -- select one --</option>
                                {this.state.buildings.map((building) =>
                                    <option key={building.id} data-key={building.id}>
                                        {building.name} </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        {this.state.currentBuildingId ?
                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Floor No."  value={this.state.newFloorNum}
                                                  onChange={this.handleNewFloorChange}/>
                                </Col>
                                <Button onClick={this.addFloor}> Add Floor </Button>
                            </Form.Group>
                            : ""}
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
                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2" style={{textAlign: 'left'}}> Desks </Form.Label>
                                                    <Form.Control as="textarea"
                                                                  onChange={(e) => {
                                                                      this.updateDesks(e, floorId)
                                                                  }} rows={5} key={floorId}
                                                                  defaultValue={floor.desks}/>
                                                    <Form.Text className="text-muted">
                                                        Please enter as a comma separated list (ex. 100, 200, etc.)
                                                    </Form.Text>
                                                </Form.Group>

                                                <Button style={{marginRight: '10px'}}onClick={(e) => {
                                                    this.updateFloor(e, floorId)
                                                }} type="submit" className="mb-2">
                                                    Save
                                                </Button>
                                                <Button variant={"danger"} onClick={(e) => {
                                                    this.deleteFloor(e, floorId)
                                                }} type="submit" className="mb-2">
                                                    Delete
                                                </Button>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })}

                        </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.currentBuildingId?
                            <Button variant={"danger"} onClick={this.deleteBuilding} type="submit" className="mb-2">
                                Delete Building
                            </Button> :
                            ""
                        }

                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}