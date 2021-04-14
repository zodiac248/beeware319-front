import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, Col, Container, Form, Modal, ModalBody, ModalFooter, Row} from "react-bootstrap";
import client from "../../API/api";
import {Link} from "react-router-dom";
import {toTitleCase} from "../../helpers";
import {NotificationManager} from "react-notifications";

export class ViewCommentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {comments: [], content: ""}
    }

    viewCommentsStyles = {
        textAlign: 'left',
        wordWrap: 'break-word'
    }

    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        client.social.getCommentsByPost({postingId: this.props.post.id}).then(res => {
            this.setState({comments: res.data})
        })
    }

    handleContentChange = (e) => {
        this.setState({content: e.target.value})
    }

    deleteComment = (e, comment) => {
        client.social.deleteComment({id: comment.id}).then(res => {
            this.getComments()
        })
    }

    addComment = (e) => {
        let content = this.state.content.trim()
        if (content === "") {
            NotificationManager.error("No comment to add")
            return;
        }
        let payload = {
            email: this.props.email,
            postingId: this.props.post.id,
            content: content
        }
        client.social.addComment(payload).then(res => {
            this.setState({content: ""})
            this.getComments()
        })
    }

    handleShow = (e) => {
        this.setState({show: true})
    }

    handleClose = (e) => {
        this.setState({show: false})
    }

    render() {
        return (
            <>
                <Link style={{color: "grey"}} size="sm" onClick={this.handleShow}>
                    View Comments
                </Link>

                <Modal scrollable={true} show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comments for "{toTitleCase(this.props.post.title)}"</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Container style={this.viewCommentsStyles}>
                            {
                                this.state.comments.length > 0 ?
                                    this.state.comments.map(comment => {
                                        return (
                                            <div>
                                                {comment.content}
                                                <br/>
                                                <span style={{color: "grey"}}>
                                                   Posted on {comment.date.substr(0, 10)} by {comment.email} </span>
                                                {(this.props.isAdmin || comment.email === this.props.email) &&
                                                <Link
                                                    onClick={(e) => {
                                                        this.deleteComment(e, comment)
                                                    }
                                                    }
                                                    style={{
                                                        position: "absolute",
                                                        right: "5%",
                                                        color: "crimson"
                                                    }}> Delete</Link>
                                                }
                                                <hr/>
                                            </div>
                                        )
                                    }) : "No comments to display"
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Container>
                            <Row>
                                <Col sm={10}>
                                    <Form.Group controlId="addComment.ControlTextarea">
                                        <Form.Control onChange={this.handleContentChange}
                                                      placeholder={"Add a comment..."}
                                                      value={this.state.content}
                                                      as="textarea" rows={2}/>
                                    </Form.Group>
                                    <Form.Text className="text-muted"> Max 250 characters </Form.Text>
                                </Col>
                                <Col sm={2}>
                                    <Button variant={"outline-primary"} onClick={this.addComment}> Add </Button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalFooter>
                </Modal>
            </>

        )
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {email: auth.email, isAdmin: auth.isAdmin}
}

export default connect(
    mapStateToProps,
    null
)(ViewCommentsModal);
