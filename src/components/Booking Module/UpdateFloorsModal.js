import React, {Component} from "react";
import {Button, Modal, Form, Col, Accordion, Card, Image} from "react-bootstrap";
import client from "../../API/api";
import {Row} from "react-bootstrap";
import {NotificationManager} from "react-notifications";
import EventBus from "../../EventBus";

export class UpdateFloorsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            date: "",
            buildings: [],
            floors: {},
            desks: {},
            currentBuildingId: null,
            newFloorNum: "",
            newFloorImage: "",
            sanitizedDesks: "",
            violatedDesks: null,
            duplicatedDesks: null,
            currentFloorID: null,
            confirmationShow: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false, currentBuildingId: null, floors: {}, desks: {}, newFloorNum: "", newFloorImage: "",
            sanitizedDesks: "", violatedDesks: null, duplicatedDesks: null, currentFloorID: null,
            confirmationShow: false
        })
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    handleNewFloorNumberChange = (e) => {
        let num = e.target.value.trim()
        if (/^\d+$/.test(num) && num < 2147483647 ) {
            this.setState({newFloorNum: num})
        }
    }

    handleNewFloorImageChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (ev) => {
            this.setState({newFloorImage: ev.target.result.split(',')[1]})
            e.target.value=""
        }
        reader.readAsDataURL(file)
        NotificationManager.success("Image successfully uploaded")
    }

    addFloor = (e) => {
        const floorNumber = this.state.newFloorNum
        const floorImage = this.state.newFloorImage
        if (floorNumber === "") {
            NotificationManager.error("Please fill in a floor number")
        } else if (floorImage === "") {
            NotificationManager.error("Please add an image for the floor")
        } else {
            client.booking.addFloor({
                floorNumber: floorNumber,
                buildingId: this.state.currentBuildingId,
                image: floorImage
            }).then(() => {
                NotificationManager.success("New floor added")
                this.setState({newFloorNum: "", newFloorImage: ""})
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
        let floors = this.state.floors
        let floor = this.state.floors[floorId]
        client.booking.updateFloor({
            id: floorId,
            floorNumber: floor.floorNumber,
            deskNumbers: this.state.sanitizedDesks,
            image: floor.image
        }).then(res => {
            NotificationManager.success("Saved", "", 2000)
            floor.desks = this.state.sanitizedDesks
            floors[floorId] = floor
            this.setState({confirmationShow: false, floors: floors, sanitizedDesks: "", violatedDesks: null,
                duplicatedDesks: null, currentFloorID: null})
        }).catch(res => {
            client.booking.getDesks({
                floorId: floorId
            }).then(res => {
                let floors_tmp = this.state.floors
                let desknumbers = []
                res.data.forEach(desk => { desknumbers.push(desk.deskNumber) })
                floors_tmp[floorId].desks = desknumbers.join(',')
                this.setState({confirmationShow: false, floors: floors_tmp, sanitizedDesks: "", violatedDesks: null,
                    duplicatedDesks: null, currentFloorID: null})
            }) 
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
                this.setState({currentBuildingId: null, floors: {}, desks: {}, newFloorNum: "",
                    newFloorImage: ""})
                this.getBuildings()
                EventBus.dispatch("buildingAddDelete", null)
            })
    }

    updateFloorNum = (e, floorId) => {
        let floors = this.state.floors
        let floor = this.state.floors[floorId]
        let num = e.target.value.trim()
        if (/^\d+$/.test(num) && num < 2147483647 ) {
            floor.floorNumber = num
            floors[floorId] = floor
            this.setState({floors: floors})
        }
    }

    updateFloorImage = (e, floorId) => {
        let floors = this.state.floors
        let floor = this.state.floors[floorId]

        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (ev) => {
            floor.image = ev.target.result.split(',')[1]
            floors[floorId] = floor
            this.setState({floors: floors})
        }
        reader.readAsDataURL(file)
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
        if (!this.state.currentBuildingId) {
            return;
        }
        client.booking.getFloors({buildingId: this.state.currentBuildingId}).then(res => {
            let floors = res.data
            let tempFloors = {}
            if (floors.length === 0) {
                this.setState({floors: {}})
                return;
            }
            floors.forEach(floor => {
                client.booking.getDesks({floorId: floor.id}).then(res => {
                    let temp = []
                    res.data.forEach(desk => {
                        temp.push(desk.deskNumber)
                    })
                    tempFloors[floor.id] = {}
                    tempFloors[floor.id]["desks"] = temp.join(", ")
                    tempFloors[floor.id]["floorNumber"] = floor.floorNumber
                    tempFloors[floor.id]["image"] = floor.image
                    this.setState({floors: tempFloors})
                })
            })
        })
    }

	handleConfirmationOpen = (floorId) => {
		this.setState({confirmationShow: true, currentFloorID: floorId})	
		let desks = this.state.floors[floorId].desks
		let deskList = desks.split(',')
		let sanitizedDeskSet = new Set()
        let violatedDesks = []
        let duplicatedDesks = []
		let re = /^(\d|[A-Z]|[a-z])+$/
		deskList.forEach(desk => {
			desk = desk.trim()
            if (desk.length === 0) {
                return
            }
			if (re.test(desk)){
                if (sanitizedDeskSet.has(desk)){
                    duplicatedDesks.push(desk)
                } else {
				    sanitizedDeskSet.add(desk)
                }
            } else {
                violatedDesks.push(desk)
            }
		})
		let sanitizedDeskString = Array.from(sanitizedDeskSet).join(",")
		this.setState({
            sanitizedDesks: sanitizedDeskString, 
            violatedDesks: violatedDesks,
            duplicatedDesks: duplicatedDesks
        })
	}

	handleConfirmationClose = () => {
		this.setState({confirmationShow: false})	
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
                <button className="btn btn-info" onClick={this.handleOpen}> Manage Floors</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Floors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Select a building</Form.Label>
                            <Form.Control as="select" onChange={this.handleBuildingChange}>
                                <option selected> -- select one --</option>
                                {this.state.buildings.map((building) =>
                                    <option key={building.id} data-key={building.id}>
                                        {building.name} </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        {this.state.currentBuildingId ?
                            <Form.Group as={Row}>
                                <Col sm="5">
                                    <Form.Control type="text" placeholder="Floor No." value={this.state.newFloorNum}
                                                  onChange={this.handleNewFloorNumberChange}/>
                                </Col>
                                <Col sm="4">
                                    <Form.File
                                        style={{textAlign: "left"}}
                                        label="Layout image"
                                        accept="image/png,image/jpg,image/jpeg"
                                        onChange={this.handleNewFloorImageChange}
                                        custom/>
                                </Col>
                                <Col sm="3">
                                    <Button style={{marginLeft: '50px'}} onClick={this.addFloor}> Add Floor </Button>
                                </Col>
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
                                                            }} value={floor.floorNumber}/>
                                                        </Col>
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2">
                                                        Floor Image
                                                    </Form.Label>
                                                    <Form.File custom
                                                               label={"Upload"}
                                                               accept="image/png,image/jpg,image/jpeg"
                                                               onChange={(e) => {
                                                                   this.updateFloorImage(e, floorId)
                                                               }}/>
                                                    <Image src={"data:image/jpg;base64, " + floor.image}
                                                         className="img-thumbnail"/>
                                                </Form.Group>
                                                <Form.Group as={Row}>
                                                    <Form.Label column sm="2"
                                                                style={{textAlign: 'left'}}> Desks </Form.Label>
                                                    <Form.Control as="textarea"
                                                                  onChange={(e) => {
                                                                      this.updateDesks(e, floorId)
                                                                  }} rows={5} key={floorId}
                                                                  defaultValue={floor.desks}
                                                                  value={floor.desks}/>
                                                    <Form.Text className="text-muted">
                                                        Please enter as a comma separated list (ex. 100, 200, etc.)
                                                    </Form.Text>
                                                    <Form.Text className="text-muted">
                                                        Desk numbers can consist of digits or letters only (ex. 011, 011B, 1a2b etc.)
                                                    </Form.Text>
                                                </Form.Group>

                                                <Button style={{marginRight: '10px'}} onClick={() => {
                                                    this.handleConfirmationOpen(floorId)
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
                        {this.state.currentBuildingId ?
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

                <Modal show={this.state.confirmationShow} onHide={this.handleConfirmationClose} className="confirmation">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Floor Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{
                            wordWrap: "break-word",
                            whiteSpace: "pre-line"
                        }}>
                            {this.state.duplicatedDesks !== null && this.state.duplicatedDesks.length !== 0 &&  
                                <p>
                                   {this.state.duplicatedDesks.length} desk(s) will not be added due to duplication :
                                    {this.state.duplicatedDesks.join(", ")} {"\n"}
                                </p>
                            }
                            {this.state.violatedDesks !== null && this.state.violatedDesks.length !== 0 && 
                                <p>
                                    {this.state.violatedDesks.length} desk(s) will not be added due to constraint violation :
                                    {this.state.violatedDesks.join(", ")} {"\n"}
                                </p>
                            }
                            {(this.state.violatedDesks === null || this.state.violatedDesks.length === 0) &&
                               (this.state.duplicatedDesks === null || this.state.duplicatedDesks.length === 0) &&
                                <p>
                                    Are you sure you want to update this floor?
                                </p>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer> 
                        <Button variant="secondary" onClick={this.handleConfirmationClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={(e) => {this.updateFloor(e, this.state.currentFloorID)}}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
