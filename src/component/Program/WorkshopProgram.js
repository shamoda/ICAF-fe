import React, { Component } from 'react';
import ProgramDataService from './ProgramDataService';
import { Col, Container, Row, Modal, Spinner, Card, Badge, Button } from 'react-bootstrap';
import WorkshopCorousel from './WorkshopCorousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
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
                    {/* <Row>
                        <WorkshopCorousel />
                    </Row> */}

                    <Card border="dark" className="mb-2" style={{ marginTop: '20px' }}>
                        <Card.Header>2021 ICAF</Card.Header>
                        <Card.Body>
                            <Card.Title> Workshop Program </Card.Title>
                            <Card.Text>
                                <div >
                                    <h4>Important!</h4>
                                    <p>
                                        ICAF 2021 has been organized to encourage and educate the upcoming university students to reach the
                                        standard benchmarks of the fast moving IT industry. ICAF comes forward with a program of 50 workshops
                                        conducted by professional and highly educated specialists in industry.
                                        <br /> <br />
                                        <Badge variant="danger"> Here the speciality is that workshops are free for all the registered students of ICAF 2021!!</Badge>
                                        <br /> <br />
                                        <Badge variant="warning"> All the workshops would be conducted in the campus premises,and students would be notified about the workshops in the below section of this page.</Badge>
                                    </p>
                                </div>
                                <div>
                                    <h6>Please address all questions to the ICAF 2021 Workshop Organising board</h6>
                                    <Row>
                                        <Col>
                                            <h6>Prof. Harindra Fernando</h6>
                                            <a style={{ textDecoration: "none" }} href="mailto:m.richards@gmail.com" >H.fernando@gmail.com</a>
                                        </Col>
                                        <Col>
                                            <h6>Dr. Rohithan Rajapaksha</h6>
                                            <a style={{ textDecoration: "none" }} href="mailto:steve.m@gmail.com" >RohithaRaja@gmail.com</a>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div>
                        <PostList />
                    </div>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col sm={3}>
                            <Button type="light" variant="dark" onClick={() => this.props.history.push('/')} className="workshop1-button"> <FontAwesomeIcon icon={faBackward} /> Back</Button>
                        </Col>
                    </Row>
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