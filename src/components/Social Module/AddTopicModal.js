import React, {Component} from "react";
import {Button, Form, Row, Col, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import EventBus from "../../EventBus";
import {EVENT_BUS} from "../../constants";
import {NotificationManager} from "react-notifications";
import {removeDuplicateWhiteSpace} from "../../helpers";

class AddTopicModal extends Component {
    initialState = {show: false, currTopic: "", topics: []}

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.initialState))
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    updateTopics = (e, index) => {
        if (index < this.state.topics.length) {
            let temp = this.state.topics
            temp[index] = removeDuplicateWhiteSpace(e.target.value)
            this.setState({topics: temp})
        }
    }

    deleteTopic = (index) => {
        if (index < this.state.topics.length) {
            let temp = this.state.topics
            temp.splice(index, 1)
            this.setState({topics: temp});
        }
    }

    addTopic = (e) => {
        e.preventDefault()
        if (this.state.currTopic.trim().length > 0 ) {
            let temp = this.state.topics;
            temp.push(this.state.currTopic.trim())
            this.setState({topics: temp, currTopic: ""});
        } else {
            NotificationManager.warning("No topic to add", "", 2000)
        }


    }

    updateCurrTopic = (e) => {
        this.setState({currTopic: removeDuplicateWhiteSpace(e.target.value)})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let promises = []
        if (this.state.topics.length > 0){
            this.state.topics.forEach(topic => {
                promises.push(client.social.addTopic({name: topic}))
            })
            Promise.all(promises).then(() => {
                EventBus.dispatch(EVENT_BUS.topicAddDelete, null);
                NotificationManager.success("All topics added successfully", "", 2000)
                this.setState({currTopic: "", topics: []})
            }).catch(() => {
                EventBus.dispatch(EVENT_BUS.topicAddDelete, null);
                NotificationManager.warning("Some topics could not be added", "", 2000)
                this.setState({currTopic: "", topics: []})
            })
        }
    }

    render() {
        return (
            <div className={"admin-modal"}>
                <Button variant="info" onClick={this.handleShow}>
                    Add Topics
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    scrollable={true}
                    size={"lg"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Topics</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            {this.state.topics.map((topic, index) => {
                                return (
                                    <Form.Group as={Row} controlId="formTopicName" key={index}>
                                        <Col sm="10">
                                            <Form.Control value={topic}
                                                          onChange={
                                                              (e) => {
                                                                  this.updateTopics(e, index)
                                                              }}
                                            />
                                        </Col>
                                        <Col sm="2">
                                            <Button variant={"danger"} onClick={() => {
                                                this.deleteTopic(index)
                                            }}> Delete </Button>
                                        </Col>
                                    </Form.Group>
                                )
                            })}
                            <Form.Group as={Row} controlId="formTopicName">
                                <Col sm="10">
                                    <Form.Control
                                        placeholder={"Topic name"}
                                        onChange={this.updateCurrTopic}
                                        value={this.state.currTopic}/>
                                </Col>
                                <Col sm="2">
                                    <Button variant={"primary"} onClick={this.addTopic}> Add </Button>
                                </Col>
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(
    null,
    null
)(AddTopicModal)
