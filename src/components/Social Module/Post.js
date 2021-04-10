import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Button} from "react-bootstrap";
import client from "../../API/api";
import {toTitleCase} from "../../helpers";
import ViewCommentsModal from "./ViewCommentsModal";
import {Link} from "react-router-dom";
import EventBus from "../../EventBus";
import {EVENT_BUS} from "../../constants";

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {post: null}
    }

    postStyles = {
        textAlign: 'left'
    }

    componentDidMount() {
        client.social.getPost({id: this.props.postId}).then(res => {
           this.setState({post: res.data})
        })
    }

    handleDelete = (e) => {
        e.preventDefault()
        client.social.deletePosting({id: this.state.post.id}).then(res => {
            this.setState({post: null})
            EventBus.dispatch(EVENT_BUS.postUpdate, null);
        })
    }

    render() {
        if (!this.state.post) {
            return ""
        }
        return (
            <Card style={this.postStyles} className="mt-4 card-view-border">
                <Card.Header>{toTitleCase(this.state.post.topic.name + ": " + this.state.post.title)}
                    {/*TODO: replace with name*/}
                    <span className={"float-right"}>{this.state.post.email}</span>
                </Card.Header>
                <Card.Body className="card-view-border">
                    <Card.Text>
                        {this.state.post.content.split('\n').map(function (line) {
                            return (
                                <>
                                    {line}
                                    <br/>
                                </>
                            )
                        })}
                    </Card.Text>

                    <Card.Text className={"text-muted"}>
                        {this.state.post.date.substring(0, 10)}
                    </Card.Text>
                    {/*TODO: replace with actual image*/}
                    {/*<Card.Img variant="bottom"*/}
                    {/*          src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"/>*/}
                    <ViewCommentsModal post={this.state.post}/>
                    <br/>
                    {
                        (this.props.isAdmin || this.state.post.email === this.props.email)
                        && <Link
                            variant="outline-danger"
                            size="sm"
                            onClick={this.handleDelete}
                            style={{color: "crimson"}}
                        >
                            Delete Post
                        </Link>
                    }
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    const {auth} = state
    return {name: auth.name, isAdmin: auth.isAdmin, email: auth.email}
}

export default connect(
    mapStateToProps,
    null
)(Post);