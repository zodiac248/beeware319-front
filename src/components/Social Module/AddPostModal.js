import React, {Component} from "react";
import {Button, Form, Container, ModalBody, Modal, FormGroup, Col} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import {NotificationManager} from "react-notifications";
import * as BiIcons from "react-icons/io";
import {toTitleCase} from "../../helpers";
import {Row} from "react-bootstrap";
import {Post} from "./Post";


export class AddPostModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, topicID: "", topics: [], postTitle: "", content: "", postId: -1
        }
    }

    componentDidMount() {
        client.social.getTopics().then(res => {
            this.setState({topics: res.data})
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: this.props.email,
            topicId: this.state.topicID,
            content: this.state.content,
            title: this.state.postTitle
        }
        if (payload.topicId === "") {
            NotificationManager.warning("Please select a topic.")
        } else if (payload.title === "") {
            NotificationManager.warning("Please fill in the title.")
        } else if (payload.content === "") {
            NotificationManager.warning("Please fill in your post.")
        } else if (payload.email === "" || payload.email === null) {
            NotificationManager.error("Warning! Unauthorized access!")
        } else {
            payload.title = toTitleCase(payload.title)
            client.social.addPost(payload).then(res => {
                NotificationManager.success("New post added!")
                this.setState({postId: res.data})
            });
        }
    };

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false, postId: -1})
    }

    setTopicsID = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({topicID: e.target.options[selectedIndex].getAttribute('data-key')})
    }


    setPostTitle = (e) => {
        this.setState({postTitle: e.target.value})
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
                                            <option disabled selected="selected">Select a Topic</option>
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
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        onBlur={this.setContent}
                                        as="textarea" rows={10}
                                        placeholder={"What would you like to post about..."}
                                    />
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
    const {user} = state
    return {
        email: user.email
    };
}

export default connect(
    mapStateToProps,
    null
)(AddPostModal)