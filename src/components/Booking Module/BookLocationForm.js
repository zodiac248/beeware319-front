import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Row, Col, Container, FormGroup, Image} from "react-bootstrap";
import moment from 'moment'
import {dateFormat} from "../../constants";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import client from "../../API/api";
import {isInclusivelyAfterDay, isInclusivelyBeforeDay} from "../../helpers"


export class BookLocationForm extends Component {
    initialState = {
        buildingId: null, floorId: null, desk: null, availableDesks: [], buildings: [], floors: [],
        floorImage: "", startDate: null, endDate: null
    }

    constructor(props) {
        super(props);
        this.state = JSON.parse((JSON.stringify(this.initialState)))
    }

    componentDidMount() {
        this.getBuildings()
    }

    getBuildings = () => {
        client.booking.getBuildings().then(res => {
            const buildings = res.data
            this.setState({buildings: buildings}, this.getFloors)
            if (buildings.length > 0) {
                this.setState({buildingId: buildings[0].id})
            }
        })
    }

    formatDate = (date) => {
        let dateMoment = moment(date)
        return moment(dateMoment._d).format(dateFormat)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.startDate || !this.state.buildingId || !this.state.floorId || !this.state.desk) {
            NotificationManager.warning("Please complete all fields", "", 2000)
            return;
        }
        let startDateMoment = moment(this.state.startDate)
        let endDateMoment = moment(this.state.endDate)
        let range
        if (!this.state.endDate) {
            range = 1
        } else {
            range = endDateMoment.diff(startDateMoment, "days") + 1
        }
        const payload = {
            email: this.props.email,
            deskId: this.state.desk.id,
            date: this.formatDate(this.state.startDate),
            range: 1
        }
        let promises = []
        for (let i = 0; i < range; i++) {
            payload.date = moment(this.state.startDate).add(i, 'days').format(dateFormat)
            console.log(payload)
            promises.push(client.booking.makeBooking(payload))
        }
        Promise.all(promises).then(res => {
            NotificationManager.success("All bookings made successfully", "", 2000)
            this.setState(JSON.parse((JSON.stringify(this.initialState))), this.getBuildings)
        }).catch(() => {
            NotificationManager.warning("Some bookings could not be made", "", 2000)
            this.setState(JSON.parse((JSON.stringify(this.initialState))), this.getBuildings)
        })
    }

    setDates = ({startDate, endDate}) => {
        this.setState({startDate: startDate, endDate: endDate}, this.getDesks)
    }

    setLocationCode = (e) => {
        this.setState({locationCode: e.target.value})
    }

    setBuilding = (e) => {
        if (this.state.buildings.length === 0) {
            this.setState({buildingId: null})
            return;
        }
        const selectedIndex = e.target.options.selectedIndex
        let buildingId = e.target.options[selectedIndex].getAttribute("data-key")
        this.setState({buildingId: buildingId}, this.getFloors)
    }

    getFloors = () => {
        if (!this.state.buildingId) {
            this.setState({floors: []}, this.setFloor(null))
            return
        }
        client.booking.getFloors({buildingId: this.state.buildingId}).then(res => {
            this.setState({floors: res.data, floorId: null, floorImage: ""}, this.getDesks)
        })
    }

    setFloor = (e) => {
        if (!e || this.state.floors.length === 0) {
            this.setState({floorId: null})
            return;
        }
        const selectedIndex = e.target.options.selectedIndex;
        let floorId = e.target.options[selectedIndex].getAttribute("data-key")
        this.setState({floorId: floorId}, this.getDesks)
        if (selectedIndex > 0) {
            this.setState({floorImage: this.state.floors[selectedIndex - 1].image})
        }
    }

    getDesks = () => {
        if (!this.state.startDate || !this.state.buildingId || !this.state.floorId) {
            this.setState({availableDesks: [], desk: null})
            return;
        }
        let startDate = this.formatDate(this.state.startDate)
        client.booking.getFloorInfo(this.state.floorId, startDate).then(res => {
            const desks = res.data.desks
            let temp = []
            desks.forEach(desk => {
                if (!desk.occupied) {
                    temp.push(desk)
                }
            })
            this.setState({availableDesks: []})
            this.setState({availableDesks: temp, desk: null})
        })
    }

    focusDateChange = (focusedInput) => {
        this.setState({focusedInput})
    }

    setDeskIdAndNum = (e) => {
        if (!this.state.availableDesks.length) {
            return;
        }
        const selectedIndex = e.target.options.selectedIndex;
        let deskIndex = e.target.options[selectedIndex].getAttribute("data-key")
        let desk = this.state.availableDesks[deskIndex]
        this.setState({desk: desk})
    }

    render() {
        let minDate = moment(new Date())
        let date = new Date()
        date.setDate(date.getDate() + 183)
        let maxDate = moment(date)
        const isOutsideRange = day => isInclusivelyBeforeDay(day, minDate) || isInclusivelyAfterDay(day, maxDate)

        return (
            <div>
                <Container style={{marginTop: '5%'}} as={Row} fluid>
                    <Container as={Col} fluid>
                        <h2>Book Your Location</h2>
                        <FormGroup>
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
                        </FormGroup>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Building
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    onChange={this.setBuilding}
                                    as="select"
                                    single>
                                    <option selected>Select a building</option>
                                    {this.state.buildings.map((building) => {
                                        return <option
                                            key={building.id}
                                            data-key={building.id}
                                        >{building.name}</option>
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formFloor">
                            <Form.Label column sm={2}>
                                Floor
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    onChange={this.setFloor}
                                    as="select">
                                    <option selected>Select a floor</option>
                                    {this.state.floors.map((floor) => {
                                        if (this.state.floors.length === 0) {
                                            return ""
                                        } else {
                                            return <option
                                                key={floor.id}
                                                data-key={floor.id}>
                                                {floor.floorNumber}</option>
                                        }
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formDesk">
                            <Form.Label column sm={2}>
                                Desk No.
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="select"
                                    onChange={this.setDeskIdAndNum}
                                    single>
                                    <option selected>Select a desk</option>
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
                        <Button
                            variant="primary"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Container>
                    <Container as={Col} fluid if>
                        {
                            (this.state.buildingId && this.state.floorId && this.state.floorImage)
                                ? <Image
                                    fluid
                                    alt="No image for this floor"
                                    src={"data:image/jpg;base64, " + this.state.floorImage}
                                />
                                : "No image to display"
                        }
                    </Container>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {name: auth.name, isAdmin: auth.isAdmin, email: auth.email}
}

export default connect(
    mapStateToProps,
    null
)(BookLocationForm)
