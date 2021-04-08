import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import 'react-notifications/lib/notifications.css';
import {NotificationManager, NotificationContainer} from "react-notifications";
import EventBus from "../../EventBus";
import equal from "fast-deep-equal/es6";
import {MAIL_STATUS} from "../../constants";


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
        let payload = {
            id: this.props.request.id,
            status: this.state.status,
            feedback: this.state.feedback
        }
        if (this.state.status !== this.props.mail.status || this.state.feedback !== this.props.request.feedback) {
            client.mail.updateAdminMail(payload).then(() => {
                NotificationManager.success("Request updated successfully!", "", 2000)
                EventBus.dispatch("mailUpdate", null)
                this.setState({show: false})
            })
        }
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
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
                <NotificationContainer />
                <Button variant={'outline-secondary'} onClick={this.handleShow}>Manage Request
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Current Mail Request</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
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
                                <Button variant="primary" type="submit">Update</Button>
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
)(AdminFeedbackModal)
