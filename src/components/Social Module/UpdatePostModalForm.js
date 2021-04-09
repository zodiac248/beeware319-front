import React, {Component} from "react";
import {Button, Form, Col, Row, ModalBody, Modal, FormGroup, FormLabel} from "react-bootstrap";
import {connect} from "react-redux";
import client from "../../API/api";
import "../../index.css";
import {NotificationManager} from "react-notifications";
import {toTitleCase} from "../../helpers";
import EventBus from "../../EventBus";
import {EVENT_BUS} from "../../constants";


export class UpdatePostModalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false, title: "", content: ""}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            id: this.props.post.id,
            title: this.state.title === ""? this.props.post.title : toTitleCase(this.state.title),
            content: this.state.content === ""? this.props.post.content : this.state.content
        }
        if ((payload.title === this.props.post.title && payload.content === this.props.post.content) ||
            (payload.title === "" && payload.content === "")) {
            NotificationManager.success("No changes to save")
            this.handleClose()
        } else {
            client.social.updatePosting(payload).then(res => {
                NotificationManager.success("Post updated!")
                EventBus.dispatch(EVENT_BUS.updatePost, null)
                this.handleClose()
            });
        }
    }

    handleShow = () => {
        this.setState({show:true})
    }

    handleClose = () => {
        this.setState({show:false})
    }

    setTitle = (e) => {
        this.setState({title: e.target.value.trim()})
    }

    setContent = (e) => {
        this.setState({content: e.target.value.trim()});
    }

    render(){
        return (
            <div>
                <Button variant="outline-secondary" className="left-button" onClick={this.handleShow}>
                    Update
                </Button>
                <Modal show={this.state.show} size="lg" onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update {toTitleCase(this.props.post.topic.name)} Post</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form.Group controlId={"topic_title"}>
                                <Form.Control
                                    type="text"
                                    onChange={this.setTitle}
                                    defaultValue={this.props.post.title}/>
                        </Form.Group>
                        <FormGroup>
                            <Form.Control onBlur={this.setContent} as="textarea" rows={10}
                                          defaultValue={this.props.post.content}/>
                            <Form.Text className={"text-muted"}> Max 1024 characters</Form.Text>
                        </FormGroup>
                        <Button variant="outline-secondary" className={"left-button"}
                                type="submit"
                                onClick={this.handleSubmit}>Submit</Button>
                        <Button variant="outline-secondary" onClick={this.handleClose}>Close</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
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
)(UpdatePostModalForm)