import React, { Component } from 'react';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import ReviewWorkshopDetailService from './ReviewWorkshopDetailService';

class ReviewWorkshopDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            conductor: '',
            workshopId: '',
            subject: '',
            data: '',
            description: '',
            status: '',
            rcomment: '',
            filename: '',
            loading: false
        }
        this.getWorkshop = this.getWorkshop.bind(this)
        this.reviewProposal = this.reviewProposal.bind(this)
        this.downloadProposalTemplateClicked = this.downloadProposalTemplateClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.getWorkshop()
    }

    getWorkshop() {

        ReviewWorkshopDetailService.getWorkshop(this.props.match.params.id)
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    title: data.workshopTitle,
                    conductor: data.conductor,
                    workshopId: data.workshopID,
                    description: data.workshopDescription,
                    status: data.status,
                    rcomment: data.reviewerComment,
                    subject: data.workshopSubject,
                    filename: data.filename
                })
            })
    }

    reviewProposal(event) {
        event.preventDefault()
        let formdata = new FormData()
        formdata.append('id', this.props.match.params.id)
        formdata.append('status', this.state.status)
        formdata.append('rComment', this.state.rcomment)
        this.setState({ loading: true })
        ReviewWorkshopDetailService.reviewWorkshop(formdata)
            .then(() => {
                this.setState({ loading: false })
                swal({
                    title: "Proposal reviewed successfully !!!",
                    text: "Keep reviewing, Good Luck!!",
                    icon: "success",
                    button: "Login",
                })
                this.props.history.push('/reviewer')
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

    downloadProposalTemplateClicked(fileName) {
        this.setState({ loading: true })
        ReviewWorkshopDetailService.downloadProposal(fileName)
            .then(({ data }) => {
                this.setState({ loading: false })
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Research Paper Downloaded",
                    icon: "success",
                    button: "Ok",
                })
            }).catch((err) => {
                this.setState({ loading: false })
                console.log(err.data)
                swal({
                    title: "Sorry , something went wrong!!!",
                    icon: "danger",
                    button: "error",
                })
            })
    }

    handleChange({ target: input }) {
        this.setState({
            [input.name]: input.value
        });
    }

    render() {

        const { title, workshopId, subject, rcomment, description, status, conductor, filename } = this.state
        return (
            <div>
                <div className="attendeeregistration-title">
                    WORKSHOP PROPOSOL
                </div>
                <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Button style={{ marginBottom: 10 }} variant="dark">{workshopId}</Button>
                    <h4>{title}</h4>
                    <h6>{conductor}</h6>
                    <Button style={{ background: "transparent", color: "blue", border: "none", marginBottom: "40px", padding: "0px" }} onClick={() => this.downloadProposalTemplateClicked(filename)}><FontAwesomeIcon size="sm" icon={faDownload} />&nbsp; Download</Button>
                    <p><b>Workshop Details</b></p>
                    <Row>
                        <Col >
                            Title:  &nbsp;&nbsp;<h6>{title}</h6>
                        </Col>
                        <Col>
                            Subject:  &nbsp; &nbsp;<h6>{subject}</h6>
                        </Col>
                        <Col>
                            Proposal Submitted Date : &nbsp; &nbsp; <h6>12/12/2021</h6>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 25 }}>
                        <Col>
                            Description :&nbsp; <br />
                            <h6>
                                {description}
                            </h6>
                        </Col>

                    </Row>
                    <div style={{ marginTop: "40px" }}>
                        <p><b>Submit Your Review</b></p>
                        <Form autoComplete="off" onSubmit={this.reviewProposal} style={{ marginBottom: 70 }}>
                            <Row >
                                <Col>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        name="status"
                                        value={status}
                                        required
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control className="my-1 mr-sm-2" onChange={this.handleChange} name="rcomment" value={rcomment} placeholder="your comment" required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button type="submit" className="my-1 mr-sm-2" variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    {/* {this.state.error && <p style={{ color: "red", fontWeight: "600", fontSize: "14px" }}>Please approve or reject research paper</p>} */}
                </Container>
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}
export default ReviewWorkshopDetails;