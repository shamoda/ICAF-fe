import React, { Component } from 'react';
import { Col, Container, Row, Modal, Spinner, Card, Form, FormLabel, Button, Alert } from 'react-bootstrap';
import moment from "moment";
import swal from 'sweetalert';
import Joi from 'joi-browser'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboardDataService from './AdminDashboardDataService';
import InputField from '../../Commons/InputField';
class AdminPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            workshop: {
                workshopId: this.props.match.params.id,
                title: '',
                description: '',
                date: '',
                venue: '',
                status: '',
                time: '',
                imageName: '',
                conductor: '',
                editDate: ''
            },
            reviewPost: {
                publish: 'pending',
                postComment: ''
            },
            conductorName: '',
            loading: false,
            errors: {}
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getProposalById()
    }

    Schema = {
        postComment: Joi.string().max(40).required(),
        publish: Joi.string().required(),
    }

    validate = () => {
        const abortEarly = { abortEarly: false }//1st Error priority disabled
        const { error } = Joi.validate(this.state.reviewPost, this.Schema, abortEarly)
        if (!error) return null;//if no result error return null
        const errors = {};
        for (let item of error.details) {//traversing in Joi error
            errors[item.path[0]] = item.message //target input is given priority or first object [0]
        }
        return errors
    }

    validateField = ({ name, value }) => {
        const miniWorkshop = { [name]: value } //Computed operators used [ES6]
        const miniSchema = { [name]: this.Schema[name] } //Extracted property from Schema
        const { error } = Joi.validate(miniWorkshop, miniSchema)
        return error ? error.details[0].message : null;
    }

    getProposalById = () => {
        this.setState({ loading: true })
        const { workshop, reviewPost } = this.state
        AdminDashboardDataService.getWorkshopById(workshop.workshopId)
            .then((res) => {
                workshop["workshopId"] = res.data.workshopId
                workshop["title"] = res.data.title
                workshop["subject"] = res.data.subject
                workshop["description"] = res.data.description
                workshop["conductor"] = res.data.conductor
                workshop["date"] = res.data.date
                workshop["venue"] = res.data.venue
                workshop["status"] = res.data.status
                workshop["time"] = res.data.time
                workshop["editDate"] = res.data.editDate
                workshop["imageName"] = res.data.imageName
                reviewPost["publish"] = res.data.publish
                reviewPost["postComment"] = res.data.postComment
                this.setState({
                    workshop,
                    reviewPost
                })
                this.setState({ loading: false })
                this.getConductorName()
            })
    }

    publishPost = (event) => {
        event.preventDefault()
        const { workshop, reviewPost } = this.state
        this.setState({ loading: true })
        let formData = new FormData()
        formData.append('status', reviewPost.publish)
        formData.append('postComment', reviewPost.postComment)
        console.log(reviewPost.publish)
        AdminDashboardDataService.reviewPost(workshop.workshopId, formData)
            .then(response => {
                this.setState({ loading: false })
                swal({
                    title: "Post Sucessfully " + reviewPost.publish,
                    icon: "success",
                    button: "Ok",
                }).then(() => {
                    this.props.history.push(`/admin`)
                })
            })
            .catch(error => {
                this.setState({ loading: false })
                swal({
                    title: "Oops!",
                    text: "Something went wrong, please try again.",
                    icon: "error",
                    button: "Ok",
                })
            })
        console.log('Publish')
    }

    getConductorName = () => {
        const { workshop } = this.state
        console.log(workshop.conductor)
        AdminDashboardDataService.getConductorData(workshop.conductor)
            .then((res) => {
                this.setState({ conductorName: res.data.fname + " " + res.data.lname })
            })
    }

    handleChange = ({ target: input }) => {
        let reviewPost = { ...this.state.reviewPost }
        const errors = { ...this.state.errors }
        const errorMessage = this.validateField(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]
        reviewPost[input.name] = input.value,
            this.setState({
                reviewPost,
                errors
            }, () => console.log(this.state));
    };

    render() {
        const { workshop, errors, reviewPost } = this.state
        return (
            <div>
                <Container style={{ minHeight: '600px' }}>
                    <Card style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <img src={`https://icaf-2021-proposals.s3.amazonaws.com/${workshop.imageName}`} style={{ maxwidth: "400px", maxHeight: '300px' }} />
                        <div style={{ marginLeft: '20px', marginBottom: '20px',marginTop:'10px' }}>
                            <h3>{workshop.title}</h3>
                            <h4>{workshop.subject}</h4>
                            <p>{workshop.description}</p>
                            <h6>Dr. {this.state.conductorName}</h6>
                            <h6>Venue  : {workshop.venue}</h6>
                            <p style={{ textDecoration: "none", color: "blue" }}  >{workshop.conductor}</p>
                            <Row style={{ marginTop: '25px' }}>
                                <Col sm={3}>
                                    Date : {workshop.date}
                                    <br /> <br />
                                    <div style={{ fontSize: 12 }}>Last modified on : {moment(workshop.editDate).format("MMMM Do YYYY, h:mm:ss a")}</div>
                                </Col>
                                <Col>
                                    Time  :  {moment(workshop.time, "HH:mm:ss").format("LT")}
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <div style={{ marginTop: "40px", marginBottom: "20px" }}>
                        <p><b>Submit Your Review</b></p>
                        <Form autoComplete="off" onSubmit={this.publishPost} >
                            <Row >
                                <Col xs={5}>
                                    <FormLabel>Workshop Post Status</FormLabel>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        custom
                                        name="publish"
                                        value={reviewPost.publish}
                                        required
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="pending">Pending</option>
                                        <option value="published">Publish</option>
                                        <option value="unpublished">Unpublish</option>
                                    </Form.Control>
                                    {errors.publish && <Alert variant="danger" >
                                        <Alert.Heading style={{ fontSize: "15px" }}>
                                            {errors.publish}
                                        </Alert.Heading>
                                    </Alert>
                                    }
                                </Col>
                                <Col xs={5}>
                                    <InputField
                                        FormLabel="Comments"
                                        name="postComment"
                                        value={reviewPost.postComment}
                                        handleChange={this.handleChange}
                                        FormText="Enter your comment here"
                                        type="text"
                                        placeholder="Very good...."
                                        error={errors.postComment}
                                        trap={false}
                                    />
                                    <Button style={{ marginLeft: '-475px' }} type="submit" disabled={this.validate()} className="my-1 mr-sm-2" variant="outline-dark" ><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container >
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div >
        );
    }
}
export default AdminPost;