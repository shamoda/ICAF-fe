import React, { Component } from 'react';
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import CommitteeRegistration from '../CommitteeRegistration/CommitteeRegistration';
import ManageUsers from '../ManageUsers/ManageUsers';
import ReviewPapers from '../ReviewPapers/ReviewPapers';
import ReviewWorkshop from '../ReviewWorkshop/ReviewWorkshop';
import './AdminDashboard.css'
import AdminPostList from './AdminPostList';

class AdminDashboard extends Component {

    submitBtnClicked = (email) => {
        return this.props.history.push('/review/' + email);
    }

    workshopClicked = (id) => {
        this.props.history.push(`/reviewWorkshop/${id}`)
    }

    render() {
        return (
            <div>
                <div className="program-title">
                    ADMIN PORTAL
                </div>
                <AdminStatistics />
                <div>
                    <Container className="admindash-container">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={2}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Participants</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Submissions</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Committee</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth">Posts</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div>
                                                <Tabs style={{ textAlign: "center" }} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                                    <Tab style={{ textAlign: "left" }} eventKey="a" title="Attendees">
                                                        <ManageUsers role="attendee" />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="b" title="Researchers">
                                                        <ManageUsers role="researcher" />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="c" title="Workshop Conductors">
                                                        <ManageUsers role="workshopConductor" />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div>
                                                <Tabs style={{ textAlign: "center" }} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                                    <Tab style={{ textAlign: "left" }} eventKey="a" title="Papers">
                                                        <ReviewPapers submitBtnClicked={this.submitBtnClicked} />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="b" title="Workshops">
                                                        <ReviewWorkshop workshopClicked={this.workshopClicked} />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <div>
                                                <Tabs style={{ textAlign: "center" }} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                                    <Tab style={{ textAlign: "left" }} eventKey="a" title="Reviewers">
                                                        <ManageUsers role="reviewer" />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="b" title="Editors">
                                                        <ManageUsers role="editor" />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="c" title="Admins">
                                                        <ManageUsers role="admin" />
                                                    </Tab>
                                                    <Tab style={{ textAlign: "left" }} eventKey="d" title="New">
                                                        <CommitteeRegistration />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fourth">
                                            <div>
                                                <AdminPostList />
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>


                    </Container>
                </div>
            </div>
        );
    }
}
export default AdminDashboard;