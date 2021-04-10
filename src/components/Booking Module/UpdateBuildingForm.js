import React, {Component} from "react";
import {Button, Form, Col, Row, FormGroup} from "react-bootstrap";
import client from "../../API/api";
import EventBus from "../../EventBus";
import {EVENT_BUS, NOTIFICATION_TIMER} from "../../constants";
import {NotificationManager} from "react-notifications";


export class UpdateBuildingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            buildings: [],
            updatedBuildings: {}
        }
    }

    componentDidMount() {
        this.getBuildings();
        EventBus.on(EVENT_BUS.buildingAddDelete, (data) => {
            this.getBuildings()
        })
    }

    componentWillUnmount() {
        EventBus.remove(EVENT_BUS.buildingAddDelete)
    }

    getBuildings() {
        client.booking.getBuildings().then(res => {
            this.setState({buildings: res.data})
        })
    }

    setName = (e, buildingId) => {
        let updatedBuildings = this.state.updatedBuildings
        let update = updatedBuildings[buildingId] ? updatedBuildings[buildingId] : {}
        Object.assign(update, {name: e.target.value})
        updatedBuildings[buildingId] = update
        this.setState({updatedBuildings: updatedBuildings})
    }

    setAddress = (e, buildingId) => {
        let updatedBuildings = this.state.updatedBuildings
        let update = updatedBuildings[buildingId] ? updatedBuildings[buildingId] : {}
        Object.assign(update, {address: e.target.value})
        updatedBuildings[buildingId] = update
        this.setState({updatedBuildings: updatedBuildings})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let updatedBuildings = this.state.updatedBuildings
        let promises = []
        console.log(this.state.updatedBuildings)
        Object.keys(this.state.updatedBuildings).forEach(buildingId => {
            let building = updatedBuildings[buildingId]
            let payload = {id: buildingId}
            if (building.name && building.name.trim().length > 0) {
                payload["name"] = building.name.trim()
            }
            if (building.address && building.address.trim().length > 0) {
                payload["address"] = building.address.trim()
            }
            if (!payload.name && !payload.address) {
                return
            }
            promises.push(client.booking.updateBuilding(payload))
        })
        if (promises.length === 0) {
            NotificationManager.success("No changes to save", "", NOTIFICATION_TIMER)
            this.setState({updatedBuildings: {}})
            this.getBuildings()
            return
        }
        Promise.all(promises).then(res => {
            NotificationManager.success(promises.length + " building(s) updated", "", NOTIFICATION_TIMER)
            this.setState({updatedBuildings: {}})
            EventBus.dispatch(EVENT_BUS.buildingAddDelete, null)
        }).catch(res => {
            NotificationManager.success("Some buildings could not be updated", "", NOTIFICATION_TIMER)
            this.setState({updatedBuildings: {}})
            EventBus.dispatch(EVENT_BUS.buildingAddDelete, null)
        })

    }

    handleDelete = (e, index) => {
        e.preventDefault()
        let building = this.state.buildings[index]
        client.booking.deleteBuilding({id: building.id})
            .then(res => {
                NotificationManager.success("Building successfully deleted")
                if (this.state.updatedBuildings.hasOwnProperty(building.id)) {
                    let updatedBuildings = this.state.updatedBuildings
                    delete updatedBuildings[building.id]
                    this.setState({updatedBuildings: updatedBuildings})
                }
                EventBus.dispatch(EVENT_BUS.buildingAddDelete, null)
            })
    }

    render() {
        return (
            <Form>
                <div style={{maxHeight: "600px", overflowY : "scroll", overflowX: "hidden"}}>
                {this.state.buildings.map((building, index) => {
                    return (
                        <div>
                            <Row>
                                <Col sm={10}>
                                    <Form.Group as={Row}>
                                        <Form.Label as={Col} sm={3}>Name</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => {
                                                    this.setName(e, building.id)
                                                }}
                                                defaultValue={building.name}
                                                value={this.state.updatedBuildings[building.id]
                                                && this.state.updatedBuildings[building.id].name
                                                    ? this.state.updatedBuildings[building.id].name : building.name}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <FormGroup as={Row}>
                                        <Form.Label as={Col} sm={3}>Address</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => {
                                                    this.setAddress(e, building.id)
                                                }}
                                                defaultValue={building.address}
                                                value={this.state.updatedBuildings[building.id]
                                                && this.state.updatedBuildings[building.id].address
                                                    ? this.state.updatedBuildings[building.id].address : building.address}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Button
                                        variant={"outline-danger"}
                                        onClick={(e) => {
                                            this.handleDelete(e, index)
                                        }}> Delete</Button></Col>
                            </Row>
                            <hr/>
                        </div>
                    )
                })}
                </div>
                <Button variant="outline-secondary" className={"left-button"}
                        type="submit"
                        onClick={this.handleSubmit}
                >Update</Button>
            </Form>
        );
    }
}