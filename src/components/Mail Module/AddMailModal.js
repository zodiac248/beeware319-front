import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from "react-notifications";
import EventBus from "../../EventBus";
import {Typeahead} from 'react-bootstrap-typeahead';
import {NOTIFICATION_TIMER} from "../../constants";


export class AddMailModal extends React.Component {

    initialState = {show: false, email: "", buildings: [], buildingId: null, sender: "", users: []}

    buttonStyle = {
        position: "fixed",
        top: "50%",
        left: "5%",
    }

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.initialState))
    }

    componentDidMount() {
        this.getBuildings()
        this.getUsers()
        EventBus.on("buildingAddDelete", (data) => {
            this.getBuildings()
            this.setState({buildingId: null})
        })
    }

    componentDidUpdate(prevProps) {
        if( this.props.accessToken !==  prevProps.accessToken)
        {
            this.getUsers()
        }
    }

    componentWillUnmount() {
        EventBus.remove("buildingAddDelete");
    }

    getBuildings = () => {
        client.booking.getBuildings().then(res => {
            this.setState({buildings: res.data})
        })
    }

    getUsers = () => {
        if (!this.props.accessToken) {
            return;
        }
        client.user.getAllUsers().then(users => {
            if (users) {
                this.setState({users: users})
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let sender = this.state.sender.trim()
        if (!this.validateEmail()) {
            NotificationManager.error("Please enter a valid email", "", NOTIFICATION_TIMER)
            return
        }
        if (sender === "" || !this.state.buildingId) {
            NotificationManager.error("Please fill in all fields", "", NOTIFICATION_TIMER)
            return
        }
        const payload = {
            email: this.state.email,
            buildingId: this.state.buildingId,
            sender: sender
        }
        client.mail.addMail(payload).then(res => {
            NotificationManager.success("Mail successfully added", "", NOTIFICATION_TIMER)
            EventBus.dispatch("mailUpdate", null)
        })
        this.setState({sender: ""})
    };

    handleShow = (e) => {
        this.setState({show: true})
    }

    handleClose = (e) => {
        this.setState({show: false, email: "", buildingId: null, sender: ""})
    }

    validateEmail = () => {
        let email = this.state.email
        if (email = "" || !email) { return false }
        return true
    }

    setEmail = (e) => {
        if (!e || !e[0] || !e[0].userPrincipalName) {
            this.setState({email: ""})
            return;
        }
        let email = e[0].userPrincipalName
        this.setState({email: email})
    }

    setSender = (e) => {
        this.setState({sender: e.target.value})
    }

    setBuilding = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let buildingId = e.target.options[selectedIndex].getAttribute('data-key')
        this.setState({buildingId: buildingId})
    }

    render() {
        return (
            <div>
                <button style={this.buttonStyle} className="btn btn-info" onClick={this.handleShow}>
                    Add Mail
                </button>

                <Modal show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Mail</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Container fluid>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>Receiver</Form.Label>
                                    <Col sm={10}>
                                    <Typeahead
                                        id={"email-typeahead"}
                                        labelKey={option => `${option.userPrincipalName} (${option.displayName})`}
                                        options={this.state.users}
                                        onChange={this.setEmail}
                                        placeholder="email@example.com"
                                    >
                                    </Typeahead>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label  column sm={3}>Sender</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text"
                                                      onChange={this.setSender}
                                                      value={this.state.sender}
                                                      placeholder="Sender Name"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="addMail.buildingSelect">
                                    <Form.Label>Select a building</Form.Label>
                                    <Form.Control as="select" onChange={this.setBuilding}>
                                        <option disabled selected > -- select one --</option>
                                        {this.state.buildings.map((building) =>
                                            <option key={building.id} data-key={building.id}>
                                                {building.name} </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">Add</Button>
                            </Container>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>);
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {accessToken: auth.accessToken}
}
export default connect(
    mapStateToProps,
    null
)(AddMailModal)
