import React, { Component } from 'react';
import { faDownload, faEdit, faChalkboardTeacher, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, FormLabel, Modal, Row, Spinner, Alert, Badge } from 'react-bootstrap';
import swal from 'sweetalert';
import InputField from '../../Commons/InputField';
import Joi from 'joi-browser'
import moment from "moment";
import ReviewWorkshopDetailService from '../ReviewWorkshop/ReviewWorkshopDetailService';
import AdminDashboardDataService from './AdminDashboardDataService';
class AdminReviewWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: {
                title: '',
                conductor: '',
                workshopId: '',
                subject: '',
                description: '',
                filename: '',
                currentdate: '',
                reviewComment: ''
            },
            review: {
                status: '',
                adminComment: '',
            },
            loading: false,
            errors: {}
        }
        this.getWorkshopDetail = this.getWorkshopDetail.bind(this)
        this.reviewProposal = this.reviewProposal.bind(this)
        this.downloadProposalTemplateClicked = this.downloadProposalTemplateClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validate = this.validate.bind(this)
        this.validateField = this.validateField.bind(this)
        this.deleteWorkshop = this.deleteWorkshop.bind(this)
    }

    componentDidMount() {
        this.getWorkshopDetail()
    }

    getWorkshopDetail() {
        this.setState({ loading: true })
        let workshop = { ...this.state.workshop }
        let review = { ...this.state.review }
        AdminDashboardDataService.getWorkshopById(this.props.match.params.id)
            .then(({ data }) => {
                console.log(data)
                workshop['title'] = data.title
                workshop['conductor'] = data.conductor
                workshop['workshopId'] = data.workshopId
                workshop['description'] = data.description
                workshop['subject'] = data.subject
                workshop['filename'] = data.fileName
                workshop['currentdate'] = data.current
                workshop['reviewComment'] = data.status
                review['adminComment'] = data.acomment
                review['status'] = data.rcomment
                this.setState({
                    workshop, review
                })
                this.setState({ loading: false })
            })
    }

    reviewProposal(event) {
        event.preventDefault()
        let formdata = new FormData()
        const { workshop, review } = this.state
        formdata.append('id', workshop.workshopId)
        formdata.append('status', review.status)
        formdata.append('aComment', review.adminComment)
        formdata.append('conductor', workshop.conductor)
        this.setState({ loading: true })
        ReviewWorkshopDetailService.reviewWorkshop(formdata)
            .then(() => {
                this.setState({ loading: false })
                swal({
                    title: "Proposal reviewed successfully !!!",
                    text: "Keep reviewing, Good Luck!!",
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    this.props.history.push('/admin')
                })
            }).catch((err) => {
                this.setState({ loading: false })
                swal({
                    title: "Oops!!",
                    text: "Something went wrong,please try again later.",
                    icon: "error",
                    button: "ok"
                })
            })
    }

    downloadProposalTemplateClicked() {
        const { filename } = this.state.workshop
        this.setState({ loading: true })
        ReviewWorkshopDetailService.downloadProposal(filename)
            .then(({ data }) => {
                this.setState({ loading: false })
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', filename);
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
                    icon: "error",
                    button: "error",
                })
            })
    }

    Schema = {
        adminComment: Joi.string().label("Admin Comment").required().max(30),
        status: Joi.string().label("Status").required(),
    }

    validateField({ name, value }) {
        const miniWorkshop = { [name]: value } //Computed operators used [ES6]
        const miniSchema = { [name]: this.Schema[name] } //Extracted property from Schema
        const { error } = Joi.validate(miniWorkshop, miniSchema)
        return error ? error.details[0].message : null;
    }

    handleChange = ({ target: input }) => {
        let review = { ...this.state.review }
        const errors = { ...this.state.errors }
        const errorMessage = this.validateField(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]
        review[input.name] = input.value,
            this.setState({
                review,
                errors
            }, () => console.log(this.state));
    };

    validate() {
        const abortEarly = { abortEarly: false }//1st Error priority disabled
        const { error } = Joi.validate(this.state.review, this.Schema, abortEarly)
        if (!error) return null;//if no result error return null
        const errors = {};
        for (let item of error.details) {//traversing in Joi error
            errors[item.path[0]] = item.message //target input is given priority or first object [0]
        }
        return errors
    }

    deleteWorkshop(email) {
        const { workshop } = this.state
        this.setState({ loading: true })
        swal({
            title: "You are about to delete the workshop,",
            text: workshop.workshopId,
            icon: "warning",
            buttons: true
        }).then((result) => {
            (
                AdminDashboardDataService.deleteWorkshop(email)
                    .then(response => {
                        this.setState({ loading: false })
                        swal({
                            title: "User Deleted Successfully!",
                            icon: "success",
                            button: "Ok",
                        }).then(() => {
                            this.props.history.push('/admin')
                        })
                    })
            )
        })
    }

    render() {
        const { workshop, review, errors } = this.state
        return (
            <div>
                <div className="attendeeregistration-title">
                    WORKSHOP PROPOSOL
                </div>
                <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Button style={{ marginBottom: 10 }} variant="dark">{workshop.workshopId}</Button>
                    <Row style={{ marginLeft: '10px', marginBottom: '10px' }}>
                        {workshop.status === "pending" && <Badge variant="warning">{workshop.status}</Badge>}
                        {workshop.status === "approved" && <Badge variant="success">{workshop.status}</Badge>}
                        {workshop.status === "rejected" && <Badge variant="danger">{workshop.status}</Badge>}
                    </Row>
                    <h4>{workshop.title}</h4>
                    <h6>{workshop.conductor}</h6>
                    <Button variant="outline-dark" onClick={() => this.props.history.push(`/conductorDetails/${workshop.conductor}/${workshop.workshopId}`)}><FontAwesomeIcon size="sm" icon={faChalkboardTeacher} />&nbsp; Find Workshop Conducter Details</Button> <br /><br /><br />
                    <Button onClick={this.downloadProposalTemplateClicked} style={{ background: "transparent", color: "blue", border: "none", marginBottom: "40px", padding: "0px" }} ><FontAwesomeIcon size="sm" icon={faDownload} />&nbsp; Download</Button>
                    <p><b>Workshop Details</b></p>
                    <Row>
                        <Col >
                            Title:  &nbsp;&nbsp;<h6>{workshop.title}</h6>
                        </Col>
                        <Col>
                            Subject:  &nbsp; &nbsp;<h6>{workshop.subject}</h6>
                        </Col>
                        <Col>
                            Proposal Submitted Date : &nbsp; &nbsp; <h6> {moment(workshop.currentdate).format("MMMM Do YYYY, h:mm:ss a")}</h6>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 25 }}>
                        <Col>
                            Description :&nbsp; <br />
                            <h6>
                                {workshop.description}
                            </h6>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <h6>Admin Comment</h6>
                            {review.adminComment ? review.adminComment : "Admin comment is still not available !!"}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6> Reviewer Comment</h6>
                            {workshop.reviewComment ? workshop.reviewComment : "Reviewer comment is still not available !!"}
                        </Col>
                    </Row>
                    <div style={{ marginTop: "40px" }}>
                        <p><b>Submit Your Review</b></p>
                        <Form autoComplete="off" onSubmit={this.reviewProposal} >
                            <Row >
                                <Col xs={5}>
                                    <FormLabel>Workshop Status</FormLabel>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        name="status"
                                        FormText="Enter your workshop status here"
                                        value={review.status}
                                        required
                                        onChange={this.handleChange}
                                        error={errors.status}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </Form.Control>
                                    {errors.status && <Alert variant="danger" >
                                        <Alert.Heading style={{ fontSize: "15px" }}>
                                            {errors.status}
                                        </Alert.Heading>
                                    </Alert>}
                                </Col>
                                <Col xs={5}>
                                    <InputField
                                        FormLabel="Admin Comment"
                                        name="adminComment"
                                        value={review.adminComment}
                                        handleChange={this.handleChange}
                                        FormText="Enter your comment here"
                                        type="text"
                                        placeholder="Very good...."
                                        error={errors.adminComment}
                                        trap={false}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col>
                                    <Button type="submit" className="my-1 mr-sm-2" variant="outline-dark" disabled={this.validate()}><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                    <Button className="my-1 mr-sm-2" onClick={() => this.deleteWorkshop(workshop.conductor)} variant="outline-danger"><FontAwesomeIcon size="sm" icon={faTrash} /></Button>
                                </Col>
                                <Col>
                                    <Button type="light" variant="dark" onClick={() => this.props.history.push('/admin')} className="workshop1-button"> <FontAwesomeIcon icon={faBackward} /> Back</Button>
                                </Col>
                            </Row>
                        </Form>
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
export default AdminReviewWorkshop;