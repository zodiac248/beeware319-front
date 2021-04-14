import React from "react";
import {Button, Form, Container, ModalBody, Modal, Col, Row, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import {AddBuildingForm} from "./AddBuildingForm";
import {UpdateBuildingForm} from "./UpdateBuildingForm";


export class ManageBuildingsModal extends React.Component {
    MANAGE_BUILDING_TABS = {
        addBuilding: {title: "Add Building", link: "#addBuilding", component: <AddBuildingForm/>},
        updateBuilding: {title: "Update Building", link: "#updateBuilding", component: <UpdateBuildingForm/>}
    }

    constructor(props) {
        super(props);
        this.state = {show: false, currTab: this.MANAGE_BUILDING_TABS.addBuilding}
    }

    handleSelect = (title) => {
        this.setState({currTab: title})
    }

    handleShow = (e) => {
        this.setState({show: true})
    }

    handleClose = (e) => {
        this.setState({show: false})
    }

    renderHelper = () => {
        return (this.state.currTab.component)
    }


    render() {
        return (
            <div className="admin-modal">
                <button className="btn btn-info" onClick={this.handleShow}>
                    Manage Buildings
                </button>

                <Modal scrollable={true} show={this.state.show} onHide={this.handleClose} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Manage Buildings</Modal.Title>
                    </Modal.Header>
                    <Nav variant="tabs" defaultActiveKey={this.state.currTab.link}>
                        {Object.values(this.MANAGE_BUILDING_TABS).map(tab => {
                            return (
                                <Nav.Item>
                                    <Nav.Link
                                        style={{color: "gray"}}
                                        href={tab.link}
                                        onSelect={() => {
                                            this.handleSelect(tab)
                                        }}>
                                        {tab.title}
                                    </Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                    <ModalBody>
                            <Container fluid>
                                {this.renderHelper()}
                            </Container>
                    </ModalBody>
                </Modal>
            </div>)
    }
}


export default connect(
    null,
    null
)(ManageBuildingsModal)
