import React, {Component} from "react";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";
import client from "../../API/api";
import {Post} from "./Post";

export class ViewPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], topics: []}
    }

    viewPostsStyles = {
        textAlign: 'left'
    }

    componentDidMount() {
        if (this.props.topic) {
            let temp = []
            temp.push(this.props.topic)
            this.setState({topics: temp}, this.getPosts)
        } else {
            client.social.getSubscriptionsByEmail({email: this.props.email}).then(res => {
                let temp = []
                res.data.forEach(sub => {
                    temp.push(sub.topic)
                })
                this.setState({topics: temp}, this.getPosts)
            })
        }
    }

    getPosts = () => {
        let temp = []
        this.state.topics.forEach(topic => {
            client.social.getPostByTopic({topicId: topic.id}).then(res => {
                temp = temp.concat(res.data)
                this.setState({posts: temp})
            })
        })
    }

    render() {
        return (
            <Container style={this.viewPostsStyles}>
                {
                    this.state.posts.length > 0?
                    this.state.posts.map(posting => {
                        return (
                            <Post postId={posting.id} key={posting.id}/>
                        )}): "No posts to display"
                }
            </Container>
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
)(ViewPosts);