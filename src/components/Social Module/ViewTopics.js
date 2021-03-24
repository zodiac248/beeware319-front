import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Button, Col, Row, Modal} from "react-bootstrap";
import client from "../../API/api";
import {toTitleCase} from "../../helpers";
import {ViewPosts} from "./ViewPosts";
import {element} from "prop-types";

export class ViewTopics extends Component {
    constructor(props) {
        super(props);
        this.state = {topics: {}, show: false, currentTopic: null}
    }

    cardColStyle = {
        paddingTop: '20px'
    }

    componentDidMount() {
        client.social.getTopics().then(res => {
            let temp = {}
            res.data.forEach(topic => {
                topic["subscribed"] = false
                temp[topic.id] = topic
            })
            this.setState({topics: temp})
            client.social.getSubscriptionsByEmail({email: this.props.email}).then(res => {
                let temp2 = this.state.topics
                res.data.forEach(sub => {
                    temp2[sub.topic.id].subscribed = true
                    temp2[sub.topic.id].subscriptionId = sub.id
                })
                this.setState({topics: temp2})
            })
        })
    }

    handleSubscribe = (topicId) => {
        const email = this.props.email
        alert(email)
        client.social.addNewSubscription({email: email, topicId: topicId}).then(res => {
            let topics = this.state.topics
            topics[topicId].subscribed = true;
            topics[topicId].subscriptionId = res.data;
            this.setState({topics})
        })
    }

    handleUnsubscribe = (topicId) => {
        let id = this.state.topics[topicId].subscriptionId
        client.social.deleteSubscription({id}).then(res => {
            let topics = this.state.topics
            topics[topicId].subscribed = false;
            this.setState({topics})
            // TODO add notification for unsubscription success.
        })
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpenPosts = (e, topic) => {
        this.setState({currentTopic: topic, show: true})
    }

    render() {
        return (
            <div>
                    <Row>
                        {Object.keys(this.state.topics).map((key) => {
                            let topic = this.state.topics[key]
                            return (
                                <Col style={this.cardColStyle} sm={"6"}>
                                <Card key={key}>
                                    <Card.Img src="https://i.stack.imgur.com/y9DpT.jpg"/>
                                    <Card.Body>
                                        <Card.Title >
                                            {toTitleCase(topic.name)}
                                        </Card.Title>
                                        <Card.Text>
                                            {/*    TODO: add topic description*/}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button
                                            id={topic.id}
                                            value={topic.name}
                                            variant={"outline-secondary"}
                                            className="float-left"
                                            onClick={(e) => {this.handleOpenPosts(e, topic)}}>
                                            See All Posts
                                        </Button>
                                            <Button
                                                id={topic.id}
                                                value={topic.name}
                                                variant={"outline-secondary"}
                                                className="float-right"
                                                // onClick={this.handleUnsubscribeConfirmation}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    alert("here")
                                                    this.state.topics[topic.id].subscribed ?
                                                    this.handleUnsubscribe(topic.id) : this.handleSubscribe(topic.id)
                                                }}
                                            >
                                                {this.state.topics[topic.id].subscribed ?
                                                    "Unsubscribe" :
                                                    "Subscribe"
                                                }
                                            </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>)
                            })}
                    </Row>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>Category: {this.state.currentTopic? toTitleCase(this.state.currentTopic.name) : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewPosts topic={this.state.currentTopic} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {user} = state
    return {email: user.email, username: user.username, isLoggedIn: user.isLoggedIn, isAdmin: user.isAdmin, fName: user.fName, lName: user.lName}
}

export default connect(
    mapStateToProps,
    null
)(ViewTopics);