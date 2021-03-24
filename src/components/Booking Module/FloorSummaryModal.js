import React, {Component} from "react";
import {Button, Modal, Form, Table} from "react-bootstrap";
import client from "../../API/api";

export class FloorSummaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false, date: "", buildings: [], floors: []}
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    handleDateChange = (e) => {
        this.setState({date: e.target.value})
    }

    handleBuildingChange = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let buildingId = e.target.options[selectedIndex].getAttribute('data-key')
        client.booking.getFloors({buildingId}).then(res => {
            this.setState({floors: res.data})
        }).then(() => {
            let temp = []
            this.state.floors.forEach(floor => {
                client.booking.getFloorInfo(floor.id, this.state.date).then(res => {
                    floor = {...floor, occupied: res.data.occupiedDesks, total: res.data.totalDesks}
                    temp.push(floor)
                    this.setState({floors: temp})
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
                <button className="btn btn-info" onClick={this.handleOpen}> View Bookings Summary</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Summary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formDate" xs="1">
                            <Form.Label column>
                                Date
                            </Form.Label>
                            <Form.Control onChange={this.handleDateChange}
                                          type="date"
                                          name="date"
                                          placeholder="Date"
                            />
                        </Form.Group>

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

                        <Table bordered>
                            <thead>
                            <tr>
                                <th>Floor No.</th>
                                <th>Occupied Desks</th>
                                <th>Total Desks</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.floors.map((floor, index) =>
                                    <tr>
                                        <td>{floor.floorNumber}</td>
                                        <td>{floor.occupied}</td>
                                        <td>{floor.total}</td>
                                    </tr>
                            )}
                            </tbody>
                        </Table>
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