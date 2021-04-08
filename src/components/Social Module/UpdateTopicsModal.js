import React, {Component} from "react";
import {Button, Form, ModalBody, Modal, Col, Row, Container} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import * as HiIcons from "react-icons/hi";
import {toTitleCase} from "../../helpers";
import EventBus from "../../EventBus";

export class UpdateTopicsModal extends Component {
    initialState = {show: false, newTopicNames: {}, originalTopics: []}

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.initialState))
    }

    componentDidMount() {
        this.getTopics();
        EventBus.on("topicAddDelete", (data) => {
            this.getTopics();
            this.setState({newTopicNames: {}})
        })
    }

    componentWillUnmount() {
        EventBus.remove("topicAddDelete");
    }

    getTopics = () => {
        client.social.getTopics().then(res => {
            this.setState({originalTopics: res.data})
        })
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    updateTopic = (e, id) => {
        let temp = this.state.newTopicNames
        temp[id] = e.target.value
        this.setState({newTopicNames: temp});
    }

    deleteTopic = (e, id, index) => {
        let newTopicNames = this.state.newTopicNames
        let originalTopics = this.state.originalTopics
        client.social.deleteTopic({id: id}).then(() => {
            originalTopics.splice(index, 1);
            if (newTopicNames.hasOwnProperty(id)) {
                delete newTopicNames[id]
            }
            EventBus.dispatch("topicAddDelete", null)
            this.setState({newTopicNames: newTopicNames, originalTopics: originalTopics});
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(this.state.newTopicNames).length >= 0) {
            Object.keys(this.state.newTopicNames).forEach(id => {
                let name = this.state.newTopicNames[id];
                client.social.updateTopic({id, name}).then(() => {
                    this.getTopics()
                    this.setState({newTopicNames: {}})
                })
            })
        }
    }


    render() {
        return (
            <div>
                <Button variant="info" onClick={this.handleShow}>
                    Update Topics
                </Button>
                <Modal size={"lg"} show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Topics</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form>
                            {this.state.originalTopics.map((topic, index) => {
                                return (
                                    <Form.Group as={Row} controlId="formTopicName" key={index}>
                                        <Col>
                                            {toTitleCase(topic.name)}
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder={"New name"}
                                                value={this.state.newTopicNames[topic.id]? this.state.newTopicNames[topic.id] : ""}
                                                onChange={
                                                    (e) => {
                                                        this.updateTopic(e, topic.id)
                                                    }}
                                            />
                                        </Col>
                                        <Col>
                                            <Button variant={"outline-danger"} onClick={
                                                (e) => {
                                                    this.deleteTopic(e, topic.id, index)
                                                }}> Delete </Button>
                                        </Col>
                                    </Form.Group>
                                )
                            })}
                        </Form>
                    </ModalBody>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {
        email: auth.email
    };
}

export default connect(
    mapStateToProps,
    null
)(UpdateTopicsModal)