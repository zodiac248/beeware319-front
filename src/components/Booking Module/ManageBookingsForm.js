import React, {Component} from "react";
import {Button, Form, Table, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";

export class ManageBookingsForm extends Component {

    formBodyStyle = {
        width: '90%',
        marginRight: '5%'
    }

    constructor(props) {
        super(props);
        this.state = {date: "", bookings: {}}
    }

    handleDateChange = (e) => {
        this.setState({date: e.target.value})
    }

    clearDate = (e) => {
        e.preventDefault()
        this.setState({date: ""})
    }

    handleDelete = (e) => {
        e.preventDefault()
        let temp = this.state.bookings
        Object.keys(this.state.bookings).forEach(key => {
            let booking = this.state.bookings[key]
            if (booking.checked) {
                client.booking.deleteBooking({id: booking.id}).then(res => {
                    delete temp[key]
                    this.setState({bookings: temp})
                })
            }
        })

    }

    handleCheck = (e, booking) => {
        let temp = this.state.bookings
        booking.checked = e.target.checked
        temp[booking.id] = booking
        this.setState({bookings: temp})
    }

    componentDidMount() {
        let temp = {}
        client.booking.getBookings({email: this.props.email}).then(res => {
            res.data.forEach(booking => {
                booking['checked'] = false
                temp[booking.id] = booking
            })
            this.setState({bookings: temp})
        })
    }

    render() {
        return (
            <div>
                <h2> YOUR BOOKINGS </h2>
                <Row className="float-right" style={this.formBodyStyle}>
                    <Col sm={8}>
                        <Form.Group controlId="formDate">
                            <Form.Control onChange={this.handleDateChange}
                                          type="date"
                                          name="date"
                                          value={this.state.date}/>
                        </Form.Group>
                    </Col>
                    <Col sm={1}>
                        <Button onClick={this.clearDate}> Clear </Button>
                    </Col>
                    <Col sm={2}>
                    <Button variant="outline-danger"
                            className="position-fixed"
                            onClick={this.handleDelete}>
                        Delete Selected
                    </Button>
                    </Col>
                </Row>
                <Table className="bordered float-right" style={this.formBodyStyle}>
                    <thead>
                    <tr>
                    <th> Select</th>
                    <th> Location</th>
                    <th> Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.bookings).map((key) => {
                        const booking = this.state.bookings[key]
                        if (this.state.date && booking.date.substr(0, 10) !== this.state.date) {
                            return ""
                        }
                        return (
                            <tr key={booking.id}>
                                <td>
                                    <Form.Check
                                        custom
                                        type="checkbox"
                                        id={booking.id}
                                        onChange={(e) => {
                                            this.handleCheck(e, booking)
                                        }}
                                    />
                                </td>
                                <td>
                                    {/*TODO: update to use buildilng code when avaialble*/}
                                    {booking.desk.floor.building.name} -
                                    Floor {booking.desk.floor.floorNumber} - {booking.desk.deskNumber}
                                </td>
                                <td>
                                    {booking.date.substr(0, 10)}
                                </td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state
    return {email: user.email}
}

export default connect(
    mapStateToProps,
    null
)(ManageBookingsForm);
