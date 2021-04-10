import React, { Component } from "react";
import { Button, Form, ModalBody, Modal, Col, Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import client from "../../API/api";
import { UpdatePostModalForm } from "./UpdatePostModalForm";
import * as HiIcons from "react-icons/hi";
import { toTitleCase } from "../../helpers";
import {NotificationManager} from "react-notifications";
import EventBus from "../../EventBus";
import {EVENT_BUS} from "../../constants";

export class UpdatePostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, posts: [], filterTopic: null, topics: []
        }
    }

    headerStyle = { margin: 'auto' }

    componentDidMount() {
        this.getTopics()
        this.getPostings()
        EventBus.on(EVENT_BUS.postUpdate, (data) => {
            this.getPostings()
        })
        EventBus.on(EVENT_BUS.topicAddDelete, (data) => {
            this.getTopics()
            this.getPostings()
        })
    }

    componentWillUnmount() {
        EventBus.remove(EVENT_BUS.postUpdate)
        EventBus.remove(EVENT_BUS.topicAddDelete)
    }

    handleShow = () => {
        this.setState({ show: true, filterTopic: null})
    }

    getPostings = () => {
        client.social.getPostingByEmployee({ email: this.props.email }).then(res => {
            this.setState({ posts: res.data})
        })
    }

    getTopics = () => {
        client.social.getTopics().then(res => {
            this.setState({topics: res.data})
        })
    }

    handleClose = () => {
        this.setState({ show: false})
    }

    setFilter = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let filterName = e.target.options[selectedIndex].getAttribute('data-key')
        this.setState({ filterTopic: filterName });
    }

    handleDelete = (e, index) => {
        e.preventDefault()
        let posts = this.state.posts
        let post = posts[index]
        client.social.deletePosting({id: post.id}).then(res => {
            posts.splice(index, 1);
            this.setState({posts: posts})
        })
    }

    render() {
        return (
            <div>
                <Button variant="light" onClick={this.handleShow}>
                    <text style={{ color: 'darkgrey' }}>{<HiIcons.HiPencilAlt />} Update Post</text>
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Your Posts</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form.Control
                            onClick={this.setFilter}
                            as="select"
                            single>
                            <option>Filter by topic</option>
                            {this.state.topics.map((topic) => {
                                return <option
                                    key={topic.id}
                                    value={topic.name}
                                    data-key={topic.name}
                                >
                                    {toTitleCase(topic.name)}
                                </option>
                            })}
                        </Form.Control>
                        <br/>
                        {this.state.posts.map((post, index) => {
                            if (!this.state.filterTopic || this.state.filterTopic == post.topic.name) {
                                return (
                                    <div>
                                        <Row>
                                            <Col sm={8}>
                                                {toTitleCase(post.title)}
                                            </Col>
                                            <Col sm={2}>
                                                <UpdatePostModalForm post={post}/>
                                            </Col>
                                            <Col sm={2}>
                                                <Button onClick={(e) => {
                                                    this.handleDelete(e, index)
                                                }}
                                                        variant={"outline-danger"}> Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                        <br/>
                                    </div>
                                )
                            }
                        })}
                    </ModalBody>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state
    return {
        email: auth.email
    };
}

export default connect(
    mapStateToProps,
    null
)(UpdatePostModal)