import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import ManageUsers from '../ManageUsers/ManageUsers';
import './AdminDashboard.css'

class AdminDashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="program-title">
                    ADMIN PORTAL
                </div>

                <AdminStatistics />

                <div>
                    <Container className="admindash-container">

                        <div className="program-topics">
                            <Tabs style={{textAlign: "center"}} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                <Tab style={{textAlign: "left"}} eventKey="a" title="Attendees">
                                <ManageUsers role="attendee" />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="b" title="Researchers">
                                    <ManageUsers role="researcher" />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="c" title="Workshop Conductors">
                                    <ManageUsers role="workshopConductor" />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="d" title="Reviewers">
                                    <ManageUsers role="reviewer" />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="e" title="Editors">
                                    <ManageUsers role="editor" />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="f" title="Admins">
                                    <ManageUsers role="admin" />
                                </Tab>
                            </Tabs>
                        </div>

                    </Container>
                </div>
            </div>
         );
    }
}
 
export default AdminDashboard;