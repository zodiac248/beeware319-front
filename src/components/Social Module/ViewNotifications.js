import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Card, Button, Modal} from "react-bootstrap";
import client from "../../API/api";
import {toTitleCase} from "../../helpers";
import {Post} from "./Post";

export class ViewNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {notifications: {}, currentPost: {}, currentPostTitle: "", show: false}
    }

    notificationStyles = {
        textAlign: 'left'
    }

    componentDidMount() {
        let temp = {}
        client.social.getNotificationsByEmail({email: this.props.email}).then(res => {
            res.data.forEach(notification => {
                temp[notification.id] = notification
            })
            this.setState({notifications: temp})
        })
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpenPosts = (e, notification) => {
        e.preventDefault()
        this.setState({currentPost: notification.posting, show: true})
    }

    handleDeleteNotification = (e, id) => {
        e.preventDefault()
        let temp = this.state.notifications
        client.social.deleteNotification({id}).then( res => {
            delete temp[id]
            this.setState({bookings: temp})
        })
    }

    render() {
        return (
            <Container>
                {this.state.notifications.length === 0? "You have no new notifications" : ""}
                {Object.keys(this.state.notifications).map(key => {
                    const notification = this.state.notifications[key]
                    return (
                        <Card border="secondary" className="mt-4" style={this.notificationStyles} key={key}>
                            <Card.Body className="card-view-border">
                                <Card.Title>New Post in "{toTitleCase(notification.posting.topic.name)}"</Card.Title>
                                <Card.Text>
                                    from {notification.posting.email} on {notification.date.substr(0, 10)}
                                </Card.Text>
                                <Button
                                    variant={"outline-secondary"}
                                    onClick={(e) => {this.handleOpenPosts(e, notification)}}>See Post
                                </Button>
                                <Button
                                    variant={"outline-secondary"}
                                    onClick={(e) =>
                                    {this.handleDeleteNotification(e, notification.id)}}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>

                    )
                })}
                <Modal show={this.state.show} onHide={this.handleClose} size="lg" scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currentPostTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Post postId={this.state.currentPost.id} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state
    return {email: user.email}
}

export default connect(
    mapStateToProps,
    null
)(ViewNotifications)