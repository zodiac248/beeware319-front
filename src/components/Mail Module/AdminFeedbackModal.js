import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row, ModalFooter} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from "react-notifications";
import EventBus from "../../EventBus";
import equal from "fast-deep-equal/es6";
import {MAIL_STATUS, NOTIFICATION_TIMER} from "../../constants";


export class AdminFeedbackModal extends React.Component {
    initialState = {show: false, status: null, feedback: ""}

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.initialState))
    }

    componentDidMount() {
        if (this.props.request && this.props.mail) {
            this.setState({
                status: this.props.mail.status,
                feedback: this.props.request.feedback,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (equal(this.props !== prevProps)) {
            this.setState({
                status: this.props.mail.status,
                feedback: this.props.request.feedback,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let feedback = this.state.feedback.trim()
        let payload = {
            id: this.props.request.id,
            status: this.state.status,
            feedback: feedback
        }
        if (this.state.status !== this.props.mail.status || feedback !== this.props.request.feedback) {
            client.mail.updateAdminMail(payload).then(() => {
                EventBus.dispatch("mailUpdate", null)
                NotificationManager.success("Request updated successfully!", "", NOTIFICATION_TIMER)
                this.setState({show: false})
            })
        } else {
            this.setState({show: false})
            NotificationManager.success("No changes to save", "", NOTIFICATION_TIMER)
        }
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false, status: this.props.mail.status, feedback: this.props.request.feedback})
    }

    setStatus = (e) => {
        const selectedIndex = e.target.options.selectedIndex
        let key = e.target.options[selectedIndex].getAttribute("data-key")
        this.setState({status: MAIL_STATUS[key]})
    }

    setFeedback = (e) => {
        this.setState({feedback: e.target.value})
    }

    render() {
        return (
            <div>
                <Button variant={'outline-secondary'} onClick={this.handleShow}>Manage Request
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Current Mail Request</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form>
                            <Container fluid>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Sender</Form.Label>
                                    <Form.Label column sm={9} style={{'textAlign':'left'}}> {this.props.mail.sender}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Receiver</Form.Label>
                                    <Form.Label column sm={9} style={{'textAlign':'left'}}> {this.props.mail.email}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} controlId="adminFeedback.status">
                                    <Form.Label  column sm={3}>Status</Form.Label>
                                    <span className={"float-right"}>
                                        <Form.Control
                                            value={this.state.status}
                                            as="select"
                                            onChange={this.setStatus}>
                                            {Object.keys(MAIL_STATUS).map((key) => {
                                                {if (MAIL_STATUS[key] !== MAIL_STATUS.awaitingRequest) {
                                                    return (<option data-key={key}> {MAIL_STATUS[key]} </option>)
                                                }}
                                            })}
                                        </Form.Control>
                                    </span>
                                </Form.Group>
                                <Form.Group as={Row} controlId="adminFeedback.feedback">
                                    <Form.Label  column sm={3}>Feedback</Form.Label>
                                    <span className={"float-right"} style={{'width':'60%'}}>
                                        <Form.Control as="textarea"
                                                      rows={3}
                                                      value={this.state.feedback}
                                                      onChange={this.setFeedback}
                                                      placeholder="Provide feedback here"/>
                                    </span>
                                </Form.Group>
                            </Container>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="primary"  onClick={this.handleSubmit}>Update</Button>
                    </ModalFooter>
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
)(AdminFeedbackModal)
