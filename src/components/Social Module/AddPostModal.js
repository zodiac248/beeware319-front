import React, {Component} from "react";
import {Button, Form, ModalBody, Modal, FormGroup, Col} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import {NotificationManager} from "react-notifications";
import * as BiIcons from "react-icons/io";
import {toTitleCase} from "../../helpers";
import {Row} from "react-bootstrap";
import Post from "./Post";
import EventBus from "../../EventBus";
import {EVENT_BUS} from "../../constants";


export class AddPostModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, topicId: -1 , topics: [], postTitle: "", content: "", postId: -1
        }
    }

    componentDidMount() {
        if (this.props.topicId) {
            client.social.getTopic({id: this.props.topicId}).then(res => {
                const topic = res.data
                this.setState({topicId: topic.id, topics: [topic]})
            })
            return;
        }
        client.social.getTopics().then(res => {
            this.setState({topics: res.data})
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: this.props.email,
            topicId: this.state.topicId,
            content: this.state.content.trim(),
            title: this.state.postTitle.trim()
        }
        if (payload.topicId === -1 || payload.title === "" || payload.content === "" || payload.email === "") {
            NotificationManager.error("Please fill out all fields")
        } else {
            payload.title = toTitleCase(payload.title)
            client.social.addPost(payload).then(res => {
                this.setState({postId: res.data})
                EventBus.dispatch(EVENT_BUS.postUpdate, null);
            });
        }
    };

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false, postId: -1, topicId: -1, postTitle: "", content: ""})
    }

    setTopicsID = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({topicId: e.target.options[selectedIndex].getAttribute('data-key')})
    }


    setPostTitle = (e) => {
        this.setState({postTitle: e.target.value.trim()})
    }

    setContent = (e) => {
        this.setState({content: e.target.value.trim()});
    }

    render() {
        return (
            <div>
                <Button variant="light" className="button-modal" onClick={this.handleShow}>
                    <text style={{color: 'darkgrey'}}>{<BiIcons.IoIosCreate/>} Add Post</text>
                </Button>
                <Modal size={"lg"} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Post</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        {this.state.postId !== -1 ?
                            <Post postId={this.state.postId}/> :
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">
                                        Topic
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            onChange={this.setTopicsID}
                                            as="select">
                                            {this.props.topicId? "" :
                                                <option disabled selected="selected">Select a Topic</option>}
                                            {this.state.topics.map((value) => {
                                                return (
                                                    <option
                                                        key={value.id}
                                                        data-key={value.id}>
                                                        {toTitleCase(value.name)}
                                                    </option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Post Title</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            onChange={this.setPostTitle}
                                            placeholder="Enter Title"
                                        />
                                    </Col>
                                </Form.Group>
                                <FormGroup controlId={"text_area"}>
                                    <Form.Control
                                        onBlur={this.setContent}
                                        as="textarea" rows={10}
                                        placeholder={"What would you like to post about..."}
                                    />
                                    <Form.Text className="text-muted"> 1024 characters max</Form.Text>
                                </FormGroup>
                                <Button variant="outline-secondary" type="submit">Submit</Button>
                            </Form>
                        }
                    </ModalBody>
                </Modal>
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
)(AddPostModal)