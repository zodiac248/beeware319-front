import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import NavigationBar from "./components/General/NavigationBar"
import {Link} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import client from "./API/api";

function App() {
    return (
        <div className="App">
            < NavigationBar/>
            <div className="heading">
                <h1> WELCOME TO PANDEMIC PAL </h1>
                <div className="links-container">
                    <div className="links">
                        <Card style={{ minHeight: '175px'}}>
                            <Card.Body>
                                <Card.Title><Link to="/booking" className="btn btn-info btn-lg links-btn"> BOOKINGS </Link></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Manage and book your expected work locations</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="links">
                        <Card style={{ minHeight: '175px'}}>
                            <Card.Body>
                                <Card.Title><Link to="/social" className="btn btn-info btn-lg links-btn"> SOCIAL </Link></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Create, view, and interact with posts from your coworkers</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="links">
                        <Card style={{ minHeight: '175px'}}>
                            <Card.Body>
                                <Card.Title><Link to="/mail" className="btn btn-info btn-lg links-btn"> MAIL </Link></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Manage your in-person mail</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
