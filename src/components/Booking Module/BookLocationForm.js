import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Row, Col, Container, Figure, Modal, ModalFooter} from "react-bootstrap";
import moment from 'moment'
import store from '../../store'
import {advancedDateRange, dateFormat} from "../../constants";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import client from "../../API/api";
import {isInclusivelyAfterDay, isInclusivelyBeforeDay} from "../../helpers"


export class BookLocationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {date: "", building: "", buildingName: "", floorId: "", floor: "", deskObj: "",
            allDesks: [], availableDesks: [], allBuildings: [], allFloors: [], showSuccessPopup: false,
            floorImage: "", startDate: null, endDate: null, range: "", formattedStartDate: "", formattedDate: ""}
    }

    componentDidMount() {
        client.booking.getBuildings().then(res => {
            const buildingData = res.data
            this.setState({allBuildings: buildingData, building: buildingData[0].id,
                buildingName: buildingData[0].name})
            this.getFloorsArray(this.state.building)
        })
    }

    handleConfirmation = (e) => {
        e.preventDefault()
        if (this.state.startDate === null) {
            NotificationManager.warning("Please select the start and end date.", "", 2000)
        }
        else if (this.state.building === "" || this.state.floor === "" || this.state.deskObj === "") {
            NotificationManager.warning("You must select all location information", "", 2000)
        }
        else {
            this.handleOpenConfirmation()
        }
    }

    setDate = (e) => {
        this.setState({ date: e.target.value})
    }

    setDates = ({startDate, endDate}) => {
        this.componentDidMount()
        let startDateM = moment(startDate)
        let endDateM = moment(endDate)
        let formattedStartDate = moment(startDateM._d).format(dateFormat)
        let formattedEndDate = moment(endDateM._d).format(dateFormat)
        this.setState({ startDate: startDate, endDate: endDate, formattedStartDate: formattedStartDate})
        this.setDateRange(startDateM, endDateM, this.state.formattedStartDate, formattedEndDate)
    }

    setDateRange(startDateM, endDateM, formattedStartDate, formattedEndDate) {
        let range = endDateM.diff(startDateM, "days")
        if (!range) {
            this.setState({range: 1, formattedDate: formattedStartDate})
        } else {
            this.setState({range: range + 1, formattedDate: formattedStartDate + " to " + formattedEndDate})
        }
    }

    focusDateChange = (focusedInput) => {
        this.setState({ focusedInput })
    }

    setLocationCode = (e) => {
        this.setState({locationCode: e.target.value})
    }

    setBuilding = (e) => {
        const selectedIndex = e.target.options.selectedIndex
        let buildingId = e.target.options[selectedIndex].getAttribute("data-key")
        this.setState({building: buildingId, buildingName: e.target.value})
        this.getFloorsArray(buildingId)
    }

    getFloorsArray(buildingId) {
        client.booking.getFloors({buildingId: buildingId}).then(res => {
            if (res.data.length === 0) {
                this.setState({allFloors: res.data});
            } else {
                this.setState({allFloors: res.data, floor: res.data[0].floorNumber, floorId: res.data[0].id})
                this.getDesksArray(this.state.floor, this.state.floorId)
            }
        })
    }

    setFloor = (e) => {
        if (this.state.floor.length !== 0) {
            const selectedIndex = e.target.options.selectedIndex;
            let floorId = e.target.options[selectedIndex].getAttribute("data-key")
            this.setState({floor: e.target.value, floorId: floorId})
            this.getDesksArray(floorId)
        }
    }

    getDesksArray(floorId) {
        let startDate = ""
        if (this.state.startDate !== null) {
            startDate = this.state.formattedStartDate
        }
        client.booking.getFloorInfo(floorId, startDate).then(res => {
            if (res.data.length === 0) {
                this.setState({availableDesks: res.data});
            } else {
                const desksOnFloorArray = res.data.desks
                const availableDesksArray = []
                let desk = null
                for (var i = 0; i < desksOnFloorArray.length; i++) {
                    if (desksOnFloorArray[i].occupied === "false") {
                        if (desk === null) {
                            desk = desksOnFloorArray[i]
                        }
                        availableDesksArray.push(desksOnFloorArray[i])
                    }
                }
                this.setState({deskObj: desk, allDesks: desksOnFloorArray,
                    availableDesks: availableDesksArray})
            }
        })
    }

    setDeskIdAndNum = (e) => {
        if (this.state.availableDesks.length !== 0) {
            const selectedIndex = e.target.options.selectedIndex;
            let deskIndex = e.target.options[selectedIndex].getAttribute("data-key")
            let desk = this.state.availableDesks[deskIndex]
            this.setState({deskObj: desk})
        }
    }

    handleOpenConfirmation = () => {
        this.setState({showSuccessPopup: true})
    }

    handleCloseConfirmation = () => {
        this.setState({showSuccessPopup: false})
    }

    handleConfirmedSubmit = () => {
        if (this.state.range === 1) {
            const payload = {
                deskId: this.state.deskObj.id,
                email: store.getState().user.email,
                date: this.state.formattedStartDate,
                range: this.state.range
            }
            client.booking.getBookingsByDeskId({deskId: payload.deskId}).then(res => {
                this.checkBookings(payload.deskId, payload, res.data)
                this.handleCloseConfirmation()
                this.setState({building: "", buildingName: "", floorId: "", floor: "", deskObj: "",
                    allDesks: [], availableDesks: [], allBuildings: [], allFloors: [], startDate: null,
                    endDate: null, range: "", formattedStartDate: "", formattedDate: ""}, this.componentDidMount())
                this.componentDidMount()
            })
        } else {
            const payload = {
                deskId: this.state.deskObj.id,
                email: store.getState().user.email,
                date: this.state.formattedStartDate,
                range: 1
            }
            let currentDate = this.state.startDate
            for (var i = 0; i < this.state.range; i++) {
                client.booking.getBookingsByDeskId({deskId: payload.deskId}).then(res => {
                    this.checkBookings(payload.deskId, payload, res.data)
                    payload.date = moment(currentDate).add(1, 'days').format(dateFormat)
                    currentDate = payload.date
                })
            }
            this.handleCloseConfirmation()
            this.setState({building: "", buildingName: "", floorId: "", floor: "", deskObj: "",
                allDesks: [], availableDesks: [], allBuildings: [], allFloors: [], startDate: null, endDate: null,
                range: "", formattedStartDate: "", formattedDate: ""}, this.componentDidMount())
            this.componentDidMount()
        }
    }

    checkBookings(deskId, payload, result) {
        let allBookings = []
        for (var j = 0; j < result.length; j++) {
            var fullDate = result[j].date
            var date = fullDate.substring(0,10)
            allBookings.push(date)
        }
        if (!allBookings.includes(payload.date)) {
            client.booking.addNewBooking(payload).then(res => {
                NotificationManager.success("Scheduled!", "", 2000)
            })
        } else {
            NotificationManager.error("Desk is unavailable for booking on " + payload.date + ".",
                "", 2000)
        }
    }

    render() {
        let minDate = moment(new Date())
        let date = new Date()
        date.setDate(date.getDate() + advancedDateRange)
        let maxDate = moment(date)
        const isOutsideRange = day => isInclusivelyBeforeDay(day, minDate) || isInclusivelyAfterDay(day, maxDate)

        return (
            <div>
                <NotificationContainer/>
                <Container as={Row} fluid>
                    <Container as={Col} fluid>
                        <h2>Book Your Location</h2>

                        <br/>
                        <h4>Select Date(s):</h4>
                        <Form>
                            <DateRangePicker
                                minDate={minDate}
                                maxDate={maxDate}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onDatesChange={this.setDates}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={this.focusDateChange}
                                isOutsideRange={isOutsideRange}
                                minimumNights={0}
                                showClearDates={true}
                            />

                            <br/>
                            <br/>
                            <br/>
                            <h4>Select Your Location:</h4>

                            <Container as={Row} fluid>

                                {/* Building */}
                                <Form.Group as={Col} controlId="formBuilding">
                                    <Form.Label column>
                                        Building Name
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            onClick={this.setBuilding}
                                            as="select"
                                            single>
                                            <option disabled>Select a building</option>
                                            {this.state.allBuildings.map((building) => {
                                                return <option
                                                    key={building.id}
                                                    value={building.id}
                                                    data-key = {building.id}
                                                >{building.name}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/* Floor */}
                                <Form.Group as={Col} controlId="formFloor">
                                    <Form.Label column>
                                        Floor Level
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            onClick={this.setFloor}
                                            as="select"
                                            single>
                                            <option disabled>Select a floor</option>
                                            {this.state.allFloors.map((floor) => {
                                                if (this.state.allFloors.length === 0) {
                                                    return ""
                                                } else {
                                                    return <option
                                                        key={floor.id}
                                                        data-key = {floor.id}>
                                                        {floor.floorNumber}</option>
                                                }
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/* Desk */}
                                <Form.Group as={Col} controlId="formDesk">
                                    <Form.Label column>
                                        Desk No.
                                    </Form.Label>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            onClick={this.setDeskIdAndNum}
                                            single>
                                            <option disabled>Select a desk</option>
                                            {this.state.availableDesks.map((desk, index) => {
                                                if (this.state.availableDesks.length === 0) {
                                                    return ""
                                                } else {
                                                    return <option
                                                        key={desk.id}
                                                        data-key={index}>
                                                        {desk.deskNumber}</option>
                                                }
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Container>
                            <br/>
                            <Button
                                variant="primary"
                                onClick={this.handleConfirmation}>
                                Submit
                            </Button>

                            <Modal show={this.state.showSuccessPopup} onHide={this.handleCloseConfirmation}>
                                <Modal.Header closeButton>Booking Confirmation</Modal.Header>
                                <Col>
                                    <Modal.Body row>
                                        <p>Would you like to be scheduled on {this.state.formattedDate}&nbsp;
                                            in &nbsp;{this.state.buildingName}&nbsp;
                                            on Floor {this.state.floor}&nbsp;at Desk {this.state.deskObj.deskNumber}?</p>
                                    </Modal.Body>
                                    <ModalFooter>
                                        <Button variant = "secondary" onClick={this.handleCloseConfirmation}>No</Button>
                                        <Button variant = "primary" onClick={this.handleConfirmedSubmit}>Yes!</Button>
                                    </ModalFooter>
                                </Col>
                            </Modal>
                        </Form>
                    </Container>

                    <Container as={Col} fluid>
                        <h2>Floor and Desks</h2>
                        <br/>

                        <Figure>
                            <Figure.Image
                                width={1000}
                                height={1000}
                                alt="No image for this floor"
                                src="https://i.stack.imgur.com/y9DpT.jpg"
                            />
                            <Figure.Caption>
                                {this.state.buildingName} on Floor {this.state.floor}
                            </Figure.Caption>
                        </Figure>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(BookLocationForm)
