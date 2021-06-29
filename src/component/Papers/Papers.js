import React, { Component } from 'react';
import { Col, Container, Row, ListGroup, Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import PapersDataService from './PapersDataService'
import './Papers.css'

class Papers extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false }

        this.submitPaperClicked = this.submitPaperClicked.bind(this);
        this.downloadTemplateClicked = this.downloadTemplateClicked.bind(this);
    }

    submitPaperClicked() {
        return this.props.history.push('/paperregistration');
    }

    downloadTemplateClicked() {
        this.setState({ loading: true })
        PapersDataService.downloadPaper()
            .then(({ data }) => {
                this.setState({ loading: false })
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-research-paper-template.docx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Research Paper Template Downloaded",
                    icon: "success",
                    button: "Ok",
                })
            });
    }

    render() {
        return (
            <div>
                <div className="papers-title">
                    CALL FOR PAPERS
                </div>

                <Container className="papers-container">
                    <div className="papers-description">
                        ICAF 2021 is mainly focus on 2 categories such as research papers publications and conduction of workshops.
                        Here the specialized professionals of the industry gets the opportunity to publish their research papers in 
                        ICAF-2021 research paper feed,
                        All the research paper submissions would go under a transparent selection process which is also comprised with
                        specialists of the industry.
                        The status of the submissions would be notified to the respective researcher with an email, and the approved papers
                        would be published in ICAF research paper feed.
                    </div>

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

                    <div className="papers-topics">
                        <h4>Submissions</h4>
                        <p>
                            All submissions must be done on or before 21st March 2021. Scientific Reports publishes original research in two formats: Article and Registered Report.
                            we do not impose strict limits on word count or page number. However, we strongly recommend that you write concisely and stick to the following guidelines:
                            <ul>
                                <li>Articles should ideally be no more than 11 typeset pages</li>
                                <li>The main text should be no more than 4,500 words </li>
                                <li>The title should be no more than 20 words</li>
                                <li>The abstract should be no more than 200 words</li>
                            </ul>
                            <br/>
                            We don’t copy edit your references. Therefore, it’s essential you format them correctly, as they will be linked electronically to external databases where possible. 
                            At Scientific Reports, we use the standard Nature referencing style. So, when formatting your references, make sure they:
                            <ul>
                                <li>Run sequentially (and are always numerical).</li>
                                <li>Sit within square brackets.</li>
                                <li>Only have one publication linked to each number.</li>
                                <li>Don’t include grant details and acknowledgements.</li>
                            </ul>
                        </p>
                    </div>

                    <div className="papers-topics">
                        <h4>Important</h4>
                        <p>
                            <ul>
                                <li>One researcher can publish one and only one research paper.</li>
                                <li>ICAF adhere Zero percent plagiarism policy. Submitted paper must be 100% original. If you are referring any other paper, you should have proper permission to use their research and proper reference/citation should be given in paper.</li>
                                <li> As we say research paper, we mean your paper should be proper research, new innovation or further research work.</li>
                                <li>If there are more than one author in paper, all the authors must be in mutual understanding before submitting paper to ICAF. 
                                    Your paper must be properly formatted and adhere ICAF standard of paper formatting. 
                                    Submitted paper should be in single or double column standard paper format.
                                    Template is provided down below
                                </li>
                                <li>Researchers need to pay the submission fee of $25, once their submission get approved. Then only the research paper will be published on ICAF-2021</li>
                            </ul>
                        </p>
                    </div>

                    <div className="papers-topics" style={{ textAlign: "center" }}>
                        <Button onClick={this.downloadTemplateClicked} variant="dark" className="papers-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileDownload} />&nbsp; Download Template</Button>
                        <Button onClick={this.submitPaperClicked} variant="dark" className="papers-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileUpload} />&nbsp; Submit My Paper</Button>
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

export default Papers;