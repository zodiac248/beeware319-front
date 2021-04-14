import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Nav, Row} from "react-bootstrap"
import {connect} from "react-redux";
import client from "../../API/api";
import {MAIL_STATUS, requestStyles, highlightedInfo, EVENT_BUS} from "../../constants";
import {toTitleCase} from "../../helpers";
import {MailRequestModal} from "./MailRequestModal";
import EventBus from "../../EventBus";
import AdminFeedbackModal from "./AdminFeedbackModal";
import {Link} from "react-router-dom";
import moment from "moment";

export class ViewRequests extends Component {
    REQUEST_TABS = {
        all: {title: "All", link: "#all"},
        awaitingRequest: {title: MAIL_STATUS.awaitingRequest, link: "#awaitingRequest"},
        notStarted: {title: MAIL_STATUS.notStarted, link: "#notStarted"},
        inProgress: {title: MAIL_STATUS.inProgress, link: "#inProgress"},
        closed: {title: MAIL_STATUS.closed, link: "#closed"}
    }

    initialState = {
        currTab: this.REQUEST_TABS.all.title, mails: [], buildingId: null, buildings: []
    }

    goTopButtonStyle = {
        position: "fixed",
        bottom: "5%",
        right: "5%",
    }

    constructor(props) {
        super(props);
        this.state = JSON.parse((JSON.stringify(this.initialState)))
    }

    componentDidMount() {
        this.getBuildings()
        this.getAllRequests(this.state.currTab)
        EventBus.on("mailUpdate", (data) => {
            this.getAllRequests(this.state.currTab)
        })
        EventBus.on(EVENT_BUS.buildingAddDelete, (data) => {
            this.getBuildings()
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.adminView !== prevProps.adminView) {
            this.getAllRequests(this.state.currTab)
        }
    }

    componentWillUnmount() {
        EventBus.remove("mailUpdate");
        EventBus.remove(EVENT_BUS.buildingAddDelete);
    }

    getAllRequests(currTab) {
        if (this.props.adminView && this.props.isAdmin) {
            this.renderAdminRequests(currTab)
        } else {
            this.renderMyRequests(currTab)
        }
    }

    renderAdminRequests(currTab) {
        let temp = []
        if (currTab === this.REQUEST_TABS.all.title) {
            client.mail.getAllMail().then(res => {
                res.data.forEach(mail => {
                    temp.push(mail)
                })
                this.setState({mails: temp})
            })
        } else {
            client.mail.getMailByStatus({status: currTab}).then(res => {
                res.data.forEach(mail => {
                    temp.push(mail)
                })
                this.setState({mails: temp})
            })
        }
    }

    renderMyRequests(currTab) {
        let temp = []
        let email = this.props.email
        if (currTab === this.REQUEST_TABS.all.title) {
            client.mail.getMailByEmail({email: email}).then(res => {
                res.data.forEach(mail => {
                    temp.push(mail)
                })
                this.setState({mails: temp})
            })
        } else {
            client.mail.getMailByStatus({status: currTab}).then(res => {
                res.data.forEach(mail => {
                    if (mail.email === email) {
                        temp.push(mail)
                    }
                })
                this.setState({mails: temp})
            })
        }
    }

    getBuildings = () => {
        client.booking.getBuildings().then(res => {
            this.setState({buildings: res.data})
        })
    }

    handleBuildingChange = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        let buildingId = e.target.options[selectedIndex].getAttribute('data-key')
        this.setState({buildingId: buildingId})
    }

    handleSelect = (title) => {
        this.setState({currTab: title})
        this.getAllRequests(title)
    }

    handleDelete = (e, mail) => {
        e.preventDefault()
        client.mail.deleteMail({id: mail.id}).then(res => {
            EventBus.dispatch("mailUpdate", null)
        })
    }

    handleGoTop() {
        window.scrollTo(0,0)
    }

    variant = (mail) => {
        let status = mail.status
        if (status === MAIL_STATUS.closed || status === MAIL_STATUS.awaitingRequest ||
            !mail.request || !mail.request.requestedCompletionDate) {
            return ""
        }
        let completionDate = mail.request.requestedCompletionDate
        if (moment(completionDate).isSameOrBefore(moment(new Date()))) {
            return "danger"
        }
        if (moment(completionDate).isBetween(moment(new Date()),
            moment(new Date()).add(7, 'day'))) {
            return "warning"
        }
    }

    renderRequest = (mail) => {
        return (
            <Card key={mail.id} style={requestStyles} border={this.variant(mail)} className="mt-4">
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
                        {this.props.adminView ? <AdminFeedbackModal mail={mail} request={mail.request}/> : ""}
                        {!this.props.adminView && (mail.status === MAIL_STATUS.awaitingRequest
                            || mail.status === MAIL_STATUS.notStarted)
                            ? <MailRequestModal mail={mail} request={mail.request}/>
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
                        <br/>
                        <span
                            style={highlightedInfo}> {(mail.request.feedback === null
                            || mail.request.feedback === "")
                            ? "None"
                            : mail.request.feedback}
                        </span>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <span className={"float-left"}>{mail.date.substr(0, 10)}</span>
                    {((this.props.isAdmin && this.props.adminView) || mail.status === MAIL_STATUS.closed)
                     &&
                    <Link
                        className={"float-right"}
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                            this.handleDelete(e, mail)
                        }}
                        style={{color: "crimson"}}
                    >
                        Delete
                    </Link>}
                </Card.Footer>
            </Card>
        )
    }

    renderMail(mail) {
        return (
            <Card key={mail.id} style={requestStyles} border={this.variant(mail)} className="mt-4">
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
                    <span className={"float-left"}>{mail.date.substr(0, 10)}</span>
                    {((this.props.isAdmin && this.props.adminView) || mail.status === MAIL_STATUS.awaitingRequest)
                    &&
                    <Link
                        className={"float-right"}
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                            this.handleDelete(e, mail)
                        }}
                        style={{color: "crimson"}}
                    >
                        Delete
                    </Link>}
                </Card.Footer>
            </Card>
        )

    }

    render() {
        return (
            <div>
                <h2> Mail + Requests</h2>
                <Container fluid>
                    <Button style={this.goTopButtonStyle} variant={"outline-secondary"} onClick={this.handleGoTop}>
                        Go To Top
                    </Button>
                    <Nav variant="tabs" defaultActiveKey={this.REQUEST_TABS.all.link}>
                        {Object.values(this.REQUEST_TABS).map(tab => {
                            return (
                                <Nav.Item>
                                    <Nav.Link
                                        style={{color: "gray"}}
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
                    <br/>
                    <Form.Control as="select" onChange={this.handleBuildingChange}>
                        <option selected> Filter by building</option>
                        {this.state.buildings.map((building) =>
                            <option key={building.id} data-key={building.id}>
                                {building.name} </option>
                        )}
                    </Form.Control>

                    <div>
                        <br/>
                        {this.state.mails.length === 0 ? "No mail to display" : ""}
                        {this.state.mails.map(mail => {
                            if (!this.state.buildingId || mail.building.id == this.state.buildingId) {
                                if (mail.status !== MAIL_STATUS.awaitingRequest) {
                                    return this.renderRequest(mail)
                                } else {
                                    return this.renderMail(mail)
                                }
                            }
                        })}
                    </div>
                </Container>
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