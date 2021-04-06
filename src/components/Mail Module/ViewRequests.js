import React, {Component} from "react";
import {Card, Nav} from "react-bootstrap"
import {connect} from "react-redux";
import client from "../../API/api";
import {MAIL_STATUS, requestStyles, highlightedInfo} from "../../constants";
import {toTitleCase} from "../../helpers";
import {MailRequestModal} from "./MailRequestModal";
import EventBus from "../../EventBus";

export class ViewRequests extends Component {
    REQUEST_TABS = {
        all: {title: "All", link: "#all"},
        awaitingRequest: {title: MAIL_STATUS.awaitingRequest, link: "#awaitingRequest"},
        notStarted: {title: MAIL_STATUS.notStarted, link: "#notStarted"},
        inProgress: {title: MAIL_STATUS.inProgress, link: "#inProgress"},
        closed: {title: MAIL_STATUS.closed, link: "#closed"}
    }

    initialState = {
        currTab: this.REQUEST_TABS.all.title, mails: []
    }

    constructor(props) {
        super(props);
        this.state = JSON.parse((JSON.stringify(this.initialState)))
    }

    componentDidMount() {
        this.getAllRequests(this.state.currTab)
        EventBus.on("mailUpdate", (data) => {
            this.getAllRequests(this.state.currTab)
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.adminView !== prevProps.adminView) {
            this.getAllRequests(this.state.currTab)
        }
    }

    componentWillUnmount() {
        EventBus.remove("mailUpdate");
    }

    getAllRequests(currTab) {
        if (this.props.adminView && this.props.isAdmin) {
            this.renderAdminRequests(currTab)
        } else {
            this.renderMyRequests(currTab)
        }
    }

    renderAdminRequests(currTab) {
        let temp = {}
        if (currTab === this.REQUEST_TABS.all.title) {
            client.mail.getAllMail().then(res => {
                res.data.forEach(mail => {
                    temp[mail.id] = mail
                })
                this.setState({mails: temp})
            })
        } else {
            client.mail.getMailByStatus({status: currTab}).then(res => {
                res.data.forEach(mail => {
                    temp[mail.id] = mail
                })
                this.setState({mails: temp})
            })
        }
    }

    renderMyRequests(currTab) {
        let temp = {}
        let email = this.props.email
        if (currTab === this.REQUEST_TABS.all.title) {
            client.mail.getMailByEmail({email: email}).then(res => {
                res.data.forEach(mail => {
                    temp[mail.id] = mail
                })
                this.setState({mails: temp})
            })
        } else {
            client.mail.getMailByStatus({status: currTab}).then(res => {
                res.data.forEach(mail => {
                    if (mail.email === email) {
                        temp[mail.id] = mail
                    }
                })
                this.setState({mails: temp})
            })
        }
    }

    handleSelect = (title) => {
        this.setState({currTab: title})
        this.getAllRequests(title)
    }

    renderRequest = (mail) => {
        return (
            <Card style={requestStyles} className="mt-4">
                <Card.Header>Sent from {toTitleCase(mail.sender)}
                    <span className={"float-right"}>{mail.building.name}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Status: <span style={highlightedInfo}> {toTitleCase(mail.status)}</span>

                        <span className={"float-right"}>
                                                    Requested Completion Date:
                                            <span
                                                style={highlightedInfo}> {mail.request.requestedCompletionDate.substr(0, 10)} </span>
                                        </span>
                        <br/>

                    </Card.Text>

                    <Card.Text className={"float-right"}>
                        {this.props.adminView ? "TODO PUT ADMIN MODAL HERE" : ""}
                        {!this.props.adminView && (mail.status == MAIL_STATUS.awaitingRequest || mail.status == MAIL_STATUS.notStarted) ?
                            <MailRequestModal mail={mail} request={mail.request}/>
                            : ""}
                    </Card.Text>

                    <Card.Text>
                        {this.props.adminView &&
                        <span>
                                        Requested By:
                                        <span style={highlightedInfo}> {mail.email}</span>
                                        </span>
                        }
                    </Card.Text>

                    <Card.Text>
                        Instruction - <span style={highlightedInfo}>{mail.request.instructionType}</span>
                        <br/>
                        <span style={highlightedInfo}>
                                            {mail.request.instructionDescription}
                                        </span>
                    </Card.Text>
                    <Card.Text>
                        Feedback:
                        <span
                            style={highlightedInfo}>
                                            {mail.request.feedback}
                                        </span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {mail.date.substr(0, 10)}
                </Card.Footer>
            </Card>
        )
    }

    renderMail(mail) {
        return (
            <Card style={requestStyles} className="mt-4">
                <Card.Header>Sent from {toTitleCase(mail.sender)}
                    <span className={"float-right"}>{mail.building.name}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        To: <span style={highlightedInfo}> {mail.email}</span>
                    </Card.Text>
                    <Card.Text>
                        Status: <span style={highlightedInfo}> {toTitleCase(mail.status)}</span>
                    </Card.Text>

                    <Card.Text className={"float-right"}>
                        {this.props.adminView
                            ? ""
                            : <MailRequestModal mail={mail}/>}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {mail.date.substr(0, 10)}
                </Card.Footer>
            </Card>
        )

    }

    render() {
        return (
            <div>
                <h2>{this.state.currTab} Requests</h2>
                <Nav variant="tabs" defaultActiveKey="#all">
                    {Object.values(this.REQUEST_TABS).map(tab => {
                        return (
                            <Nav.Item>
                                <Nav.Link
                                    href={tab.link}
                                    onSelect={() => {
                                        this.handleSelect(tab.title)
                                    }}>
                                    {tab.title}
                                </Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>
                <div>
                    {Object.keys(this.state.mails).length === 0 ? "No mail to display" : ""}
                    {Object.keys(this.state.mails).map(key => {
                        const mail = this.state.mails[key]
                        if (mail.status !== MAIL_STATUS.awaitingRequest) {
                            return this.renderRequest(mail)
                        } else {
                            return this.renderMail(mail)
                        }
                    })}
                </div>
            </div>
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
)(ViewRequests)