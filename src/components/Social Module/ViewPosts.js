import React, {Component} from "react";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";
import client from "../../API/api";
import Post from "./Post";
import {EVENT_BUS} from "../../constants";
import EventBus from "../../EventBus";

export class ViewPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], topics: []}
    }

    viewPostsStyles = {
        textAlign: 'left'
    }

    componentDidMount() {
        this.getPosts()
        EventBus.on(EVENT_BUS.postUpdate, (data) => {
            this.getPosts()
        })
    }

    componentWillUnmount() {
        EventBus.remove(EVENT_BUS.postUpdate)
    }

    getPosts = () => {
        if (this.props.topic) {
            let temp = []
            temp.push(this.props.topic)
            this.setState({topics: temp}, this.getPostsByTopic)
        } else {
            client.social.getPostingBySubscriptions({email: this.props.email}).then(res => {
                this.setState({posts: res.data})
            })
        }
    }

    getPostsByTopic = () => {
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
    const {auth} = state
    return {email: auth.email, isLoggedIn: auth.isLoggedIn, isAdmin: auth.isAdmin}
}

export default connect(
    mapStateToProps,
    null
)(ViewPosts);