import React, { Component } from 'react';
import { Col, Container, Row, Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './Workshops.css'
import WorkshopDataService from './WorkshopDataService';

class Workshops extends Component {
    state = {}
    constructor(props) {
        super(props)
        this.submitWorkshopClicked = this.submitWorkshopClicked.bind(this)
        this.downloadProposalClciked = this.downloadProposalClciked.bind(this)
    }
    submitWorkshopClicked() {
        return this.props.history.push('/conductorregistration')
    }

    downloadProposalClciked(fileName) {
        this.setState({ loading: true })
        WorkshopDataService.downloadProposal(fileName)
            .then((res) => {
                this.setState({ loading: false })
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a')
                link.href = ur
                link.setAttribute('download', 'icaf-workshop-proposal-template.docx')
                document.body.appendChild(link)
                link.click()
                link.remove()
                swal({
                    title: "Workshop Proposal Template Downloaded",
                    icon: "success",
                    button: "Ok",
                })
            }).catch((err) => {
                this.setState({ loading: false })
                swal({
                    title: "Oops!!",
                    text: "Something went wrong,please try again later.",
                    error: "error",
                    button: "ok"
                })
            })
    }

    render() {
        return (
            <div>
                <div className="workshops-title">
                    CALL FOR WORKSHOPS
                </div>
                <Container className="workshops-container">
                    <div className="workshops-topics">
                        <h4>Important</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                            efficitur a orci. Integer at placerat velit.
                        </p>
                    </div>
                    <div className="workshops-subcontainer">
                        <Button variant="dark" onClick={this.downloadProposalClciked} className="workshops-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileDownload} />&nbsp; Download Proposal Template</Button>
                        <Button variant="dark" onClick={this.submitWorkshopClicked} className="workshops-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileUpload} />&nbsp; Submit Workshop Proposal</Button>
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