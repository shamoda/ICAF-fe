import React, { Component } from 'react';
import ProgramDataService from './ProgramDataService';
import { Col, Container, Row, Modal, Spinner, Card, Button } from 'react-bootstrap';
import WorkshopCorousel from './WorkshopCorousel';
import PostList from './PostList';

class WorkshopProgram extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="workshops-title">
                    WORKSHOP PROGRAM
                </div>
                <Container className="workshops-container">
                    <Row>
                        <WorkshopCorousel />
                    </Row>

                    <Card border="dark" className="mb-2" style={{ marginTop: '20px' }}>
                        <Card.Header>2021 ICAF</Card.Header>
                        <Card.Body>
                            <Card.Title> Workshop Proposals </Card.Title>
                            <Card.Text>
                                <div >
                                    <h4>Important</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                                        lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                                        Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                                    </p>
                                </div>
                                <div>
                                    <h5>Please address all questions to the ICAF 2021 Workshops Chair</h5>
                                    <Row>
                                        <Col>
                                            <h6>Prof. Myra Richards</h6>
                                            <a style={{ textDecoration: "none" }} href="mailto:m.richards@gmail.com" >m.richards@gmail.com</a>
                                        </Col>
                                        <Col>
                                            <h6>Dr. Steve Mclaughlin</h6>
                                            <a style={{ textDecoration: "none" }} href="mailto:steve.m@gmail.com" >steve.m@gmail.com</a>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div>
                        <PostList />
                    </div>
                </Container>
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div >
        );
    }
}
export default WorkshopProgram;