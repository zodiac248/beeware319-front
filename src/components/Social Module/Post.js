import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Button} from "react-bootstrap";
import client from "../../API/api";
import {toTitleCase} from "../../helpers";

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
        client.social.get({id: this.post.id}).then(res => {
            this.setState({post: null})
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
                        {this.state.post.content}
                    </Card.Text>
                    {/*TODO: replace with actual image*/}
                    {/*<Card.Img variant="bottom"*/}
                    {/*          src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"/>*/}
                </Card.Body>
                {this.props.isAdmin
                    ? <Card.Footer><Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                            this.handleDelete(e)
                        }}
                    >Delete</Button>
                    </Card.Footer>
                    : ""
                }
            </Card>
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
)(Post);