import React, { Component } from 'react';
import { Col, Container, Row, Button, Modal, Spinner, ListGroupItem, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload, faStar } from '@fortawesome/free-solid-svg-icons';
import './Workshops.css'
import WorkshopDataService from './WorkshopDataService';

class Workshops extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false }

        this.downloadProposalTemplateClicked = this.downloadProposalTemplateClicked.bind(this);
    }

    pushtoRegistration = () => {
        this.props.history.push('/conductorRegistration')
    }

    downloadProposalTemplateClicked() {
        this.setState({ loading: true })
        WorkshopDataService.downloadproposal()
            .then(({ data }) => {
                this.setState({ loading: false })
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-workshop-proposal-template.docx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Workshop Proposal Template Downloaded",
                    icon: "success",
                    button: "Ok",
                })
            });
    }

    render() {
        return (
            <div>
                <div className="workshops-title">
                    CALL FOR WORKSHOPS
                </div>

                <Container className="workshops-container">
                    <div className="workshops-description">
                        ICAF 2021 has been organized to encourage and educate the upcoming university students to reach the
                        standard benchmarks of the fast moving IT industry. ICAF comes forward with a program of 50 workshops
                        conducted by professional and highly educated specialists in industry.
                        If you are a specialized professional in IT industry and interested in sharing your knowledge with young blooming
                        students , please submit the workshop proposal and add the necessary details.
                    </div>

                    <div className="workshops-topics">
                        <div className="papers-topics">
                            <h4>Conference Topics</h4>
                            <Row>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>React JS</ListGroup.Item>
                                        <ListGroup.Item>Angular</ListGroup.Item>
                                        <ListGroup.Item>Vue</ListGroup.Item>
                                        <ListGroup.Item>Electron</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Spring Boot</ListGroup.Item>
                                        <ListGroup.Item>Express JS</ListGroup.Item>
                                        <ListGroup.Item>Koa JS</ListGroup.Item>
                                        <ListGroup.Item>Laravel</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>ASP.NET</ListGroup.Item>
                                        <ListGroup.Item>Django</ListGroup.Item>
                                        <ListGroup.Item>Ruby on Rails</ListGroup.Item>
                                        <ListGroup.Item>ReactiveX JS</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>

                    </div>

                    <div className="workshops-topics">
                        <h4>Submission </h4>
                        <p>
                            Authors are invited to submit proposals for academic workshops that they will lead and orchestrate at the conference. Authors may submit multiple proposals. Each proposal can be submitted to only one Academic Workshop Proposal Track. 
                            Please use the following guidelines to design and format your proposal.
                            <ul>
                                <li>Place title at the top of the page</li>
                                <li>The abstract should be no more than 250 words</li>
                                <li>List the names and institutional affiliations of the individuals who will lead the workshop. All workshop leads must commit to attend the conference and facilitate the workshop.</li>
                            </ul>
                        </p>
                        <br/>

                        <h4>Important</h4>
                        <p>
                            As very limited number of workshops are only given an opportunity ,the proposal which are submitted traverse through a
                            a long selection process ,and the following criteria would be taken to consideration in the selection process.
                            <div style={{ marginLeft: '20px' }}>
                                <ul>
                                    <li>Quality of the workshop proposal</li>
                                    <li>Content of the workshop.</li>
                                    <li>Educational qualifications and experience of the workshop conductor</li>
                                </ul>
                            </div>
                            The status of your proposal would be later notifed you through an email. Please don't be hesitant to contact our below organzing board memebers for
                            any necessity.
                        </p>
                    </div>

                    <div className="workshops-topics" style={{ textAlign: "center" }}>
                        <Button variant="dark" className="workshops-button" onClick={this.downloadProposalTemplateClicked} ><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileDownload} />&nbsp; Download Proposal Template</Button>
                        <Button variant="dark" className="workshops-button" onClick={this.pushtoRegistration}><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileUpload} />&nbsp; Submit Workshop Proposal</Button>
                    </div>

                    <div className="workshops-email">
                        <h5>Please address all questions to the ICAF 2021 Workshops Chair</h5>
                        <Row className="workshops-row">
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
                </Container>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Downloading...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default Workshops;