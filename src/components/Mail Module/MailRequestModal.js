import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import {NotificationManager, NotificationContainer} from "react-notifications";
import client from "../../API/api";
import equal from "fast-deep-equal/es6";
import EventBus from "../../EventBus";

export class MailRequestModal extends Component {
    INSTRUCTION_TYPES = {
        hold: "Hold",
        forward: "Forward",
        open: "Open",
        assist: "Assist"
    }

    viewStyles = {
        textAlign: 'left'
    }

    initialState = {show: false, instructionType: this.INSTRUCTION_TYPES.hold, instructionDescription: "", requestedCompletionDate: null}

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.initialState))
    }

    componentDidMount() {
        if (this.props.request) {
            this.setState({
                instructionType: this.props.request.instructionType,
                instructionDescription: this.props.request.instructionDescription,
                requestedCompletionDate: this.props.request.requestedCompletionDate.substr(0, 10)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (equal(this.props !== prevProps)) {
            this.setState({
                instructionType: this.props.request.instructionType,
                instructionDescription: this.props.request.instructionDescription,
                requestedCompletionDate: this.props.request.requestedCompletionDate.substr(0, 10)
            })
        }
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleSubmit = () => {
        if (!this.state.requestedCompletionDate) {
            NotificationManager.error("Please select a date", "", 2000)
            return;
        }
        let payload = {
            id: this.props.mail.request.id,
            instructionType: this.state.instructionType,
            instructionDescription: this.state.instructionDescription,
            requestedCompletionDate: this.state.requestedCompletionDate
        }
        if (this.props.request) {
            client.mail.updateMailRequest(payload).then(() => {
                NotificationManager.success("Request updated successfully!", "", 2000)
                this.setState({show: false})
                EventBus.dispatch("mailUpdate", null)
            })
        } else {
            client.mail.addMailRequest(payload).then(() => {
                NotificationManager.success("Request submitted successfully!", "", 2000)
                this.setState({show: false})
                EventBus.dispatch("mailUpdate", null)
            })
        }
    }

    setInstructionType = (e) => {
        const selectedIndex = e.target.options.selectedIndex
        let key = e.target.options[selectedIndex].getAttribute("data-key")
        this.setState({instructionType: this.INSTRUCTION_TYPES[key]})
    }

    setInstructionDescription = (e) => {
        this.setState({instructionDescription: e.target.value})
    }

    setDate = (e) => {
        this.setState({requestedCompletionDate: e.target.value})
    }

    render() {
        return (
            <div>
                <NotificationContainer />
                <Button variant={"outline-secondary"} onClick={this.handleShow}>Add/Edit Request</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    scrollable={true}
                    size={"lg"}
                    style={this.viewStyles}>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit a Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formMailId">
                                <Form.Label column sm={3}>{this.props.mail.building.name}</Form.Label>
                                <Form.Label column sm={9}>Sender: {this.props.mail.sender}</Form.Label>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formInstructionType">
                                <Form.Label column sm={3}>Instruction Type</Form.Label>
                                <Col sm={9}>
                                    <Form.Control value={this.state.instructionType} as="select" onChange={this.setInstructionType}>
                                        {Object.keys(this.INSTRUCTION_TYPES).map((key) => {
                                            return (<option data-key={key}> {this.INSTRUCTION_TYPES[key]} </option>)
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                value={this.state.instructionDescription}
                                controlId="formInstructionDescription">
                                <Form.Label column sm={3}>Instruction Description</Form.Label>
                                <Col sm={9}>
                                    <Form.Control onChange={this.setInstructionDescription}
                                                  as="textarea"
                                                  rows={3}
                                                  placeholder="Additional instructions..."
                                                  value={this.state.instructionDescription}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formDate">
                                <Form.Label column sm={3}>Requested Completion Date</Form.Label>
                                <Col sm={9}>
                                    <Form.Control onChange={this.setDate} type="date" value={this.state.requestedCompletionDate}></Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(MailRequestModal);