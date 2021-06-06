import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner, Col, Row, FormGroup, FormText } from 'react-bootstrap';
import swal from 'sweetalert';
import Joi from 'joi-browser'
import { faChalkboardTeacher, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import './WorkshopEditor.css'
import InputField from '../../Commons/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditorDataservice from './EditorDataservice';
import TextArea from '../../Commons/TextArea';

class WorkshopEditor extends Component {
    constructor(props) {
        super(props);
        //controlled inputs, should not be null as well..[ERR-LOG 01]
        this.state = {
            workshop: {
                id: this.props.match.params.id,
                title: '',
                subject: '',
                description: '',
                conductor: '',
                proposal: '',
                imageUrl: '',
                image: '',
                rComment: '',
                status: '',
                dates: '',
                venue: '',
                time: '',
                imageName: ''
            },
            loading: false,
            errors: {},
            imageSelected: false,
            imageSource: ''
        }
        this.editWorkshop = this.editWorkshop.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.validate = this.validate.bind(this)
        this.getProposal = this.getProposal.bind(this)
        this.validateField = this.validateField.bind(this)
    }
    componentDidMount() {
        this.getProposal()
        window.scrollTo(0, 0)

    }

    handleChange = ({ target: input }) => {

        let workshop = { ...this.state.workshop }
        const errors = { ...this.state.errors }
        const errorMessage = this.validateField(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]
        workshop[input.name] = input.value,
            this.setState({
                workshop,
                errors
            }, () => console.log(this.state));
    };

    getProposal() {
        const { workshop } = this.state
        EditorDataservice.getWorkshopById(workshop.id)
            .then((res) => {
                workshop["title"] = res.data.title
                workshop["subject"] = res.data.subject
                workshop["description"] = res.data.description
                workshop["conductor"] = res.data.conductor
                workshop["dates"] = res.data.date
                workshop["venue"] = res.data.venue
                workshop["imageName"] = res.data.imageName
                workshop["time"] = res.data.time
                this.setState({
                    workshop
                })
                console.log(workshop.title)
                console.log(workshop.imageName)
            })
    }
    // Joi.ref('password')
    //Joi@13.4 Schema [Validation Library]
    Schema = {
        title: Joi.string().required().label("Workshop Title").max(10),
        subject: Joi.string().required().label("Subject").min(1).max(10),
        description: Joi.string().required().label("Description").min(10).max(200),
        conductor: Joi,
        venue: Joi.string().required().label("Workshop Venue").max(10),
        dates: Joi,
        time: Joi
    }

    validate() {
        const abortEarly = { abortEarly: false }//1st Error priority disabled
        const { error } = Joi.validate(this.state.workshop, this.Schema, abortEarly)
        if (!error) return null;//if no result error return null
        const errors = {};
        for (let item of error.details) {//traversing in Joi error
            errors[item.path[0]] = item.message //target input is given priority or first object [0]
        }
        return errors
    }

    validateField({ name, value }) {
        const miniWorkshop = { [name]: value } //Computed operators used [ES6]
        const miniSchema = { [name]: this.Schema[name] } //Extracted property from Schema
        const { error } = Joi.validate(miniWorkshop, miniSchema)
        return error ? error.details[0].message : null;
    }
    onImageChange(event) {
        if (event.target.files.length) {
            const { workshop } = { ...this.state }
            workshop.image = event.target.files[0]
            workshop.imageUrl = URL.createObjectURL(event.target.files[0])
            this.setState({
                workshop,
                imageSelected: true
            })
        }
    }
    //edit a workshop 
    editWorkshop(event) {
        event.preventDefault()
        const { workshop } = this.state
        // const errors = this.validate();
        this.setState({ loading: true })
        //Object was used, Code 400 err, [ERR-LOG-02]
        // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
        let formData = new FormData();
        formData.append('image', workshop.image);
        formData.append('venue', workshop.venue);
        formData.append('date', workshop.dates);
        formData.append('time', workshop.time);
        formData.append('id', workshop.id)
        EditorDataservice.publishEdit(formData)
            .then(() => {
                this.setState({ loading: false })
                swal({
                    title: "Post submitted successfully",
                    text: "Your post would be displayed in the programs section",
                    icon: "success",
                    button: "Login",
                })
            }).catch(() => {
                this.setState({ loading: false })
                swal({
                    title: "Oops!!",
                    text: "Something went wrong,please try again later.",
                    icon: "error",
                    button: "ok"
                })

            })
        setTimeout(() => {
            this.props.history.push('/editorDashboard')
        }, 2000);
    }

    getImageUrls = () => {
        const { workshop } = this.state
        EditorDataservice.getImageUrl(workshop.imageName)
            .then(({ data }) => {
                return data
            })
        console.log(this.state.imageSource)

    }
    render() {
        const { errors, workshop, imageSelected } = this.state   //properties
        const { editWorkshop } = this //methods
        return (
            <div>
                <div className="workshopregistration-title">
                    EDITOR'S PORTAL
                </div>
                <Container className="workshopregistration-container">
                    <Form autoComplete="off" onSubmit={editWorkshop}>
                        <div className="workshopregistration-head">
                            <h4 className="workshopregistration-head-font">  <FontAwesomeIcon icon={faChalkboardTeacher} />Workshop Details</h4>
                        </div>
                        {/* 1st Row */}
                        <Row>
                            <Col>
                                <InputField
                                    FormLabel="Workshop Title"
                                    name="title"
                                    value={workshop.title}
                                    handleChange={this.handleChange}
                                    FormText="Enter your first name here"
                                    type="text"
                                    placeholder="Reactjs"
                                    error={errors.title}
                                    trap={false}
                                />
                            </Col>
                            <Col>
                                <InputField
                                    FormLabel="Workshop Conductor"
                                    name="conductor"
                                    value={workshop.conductor}
                                    handleChange={this.handleChange}
                                    FormText="Email would be your username"
                                    type="text"
                                    placeholder="example@gmail.com"
                                    error={errors.conductor}
                                    trap={true}
                                />
                            </Col>
                        </Row>
                        {/* 1st Row Ends */}

                        <InputField
                            FormLabel="Workshop Subject"
                            name="subject"
                            value={workshop.subject}
                            handleChange={this.handleChange}
                            FormText="Enter your last name here"
                            type="text"
                            placeholder="Redux"
                            error={errors.subject}
                            trap={false}
                        />
                        <TextArea
                            FormLabel="Description"
                            name="description"
                            value={workshop.description}
                            handleChange={this.handleChange}
                            FormText="Edit the brief description"
                            type="text"
                            placeholder="Redux is a valuable.........."
                            error={errors.description}
                            trap={false}
                        />
                        <h6 style={{ marginBottom: 30 }}>  <FontAwesomeIcon icon={faCalendarTimes} />Please assign a Date & a Venue</h6>
                        {/* 2nd Row */}
                        <Row>
                            <Col>
                                <InputField
                                    FormLabel="Venue"
                                    name="venue"
                                    value={workshop.venue}
                                    handleChange={this.handleChange}
                                    FormText="Enter the venue here"
                                    type="text"
                                    placeholder="Nelum Pokuna"
                                    error={errors.venue}
                                />
                            </Col>
                            <Col>
                                <Form.Group controlId="day">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter the Session date"
                                        name="dates"
                                        value={workshop.dates}
                                        onChange={this.handleChange}
                                        error={errors.dates}
                                    />
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="time">
                                    <Form.Label>Session End Time :</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="Ending time"
                                        name="time"
                                        value={workshop.time}
                                        onChange={this.handleChange}
                                        error={errors.time}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* 2nd Row Ends */}
                        <Form.Group>
                            <Form.File name="image" label="Workshop Image" onChange={this.onImageChange} style={{ borderWidth: "1px", borderColor: "red" }}>
                            </Form.File>
                        </Form.Group>
                        {imageSelected ?
                            <img style={{ width: "100px", height: "100px", borderRadius: "10px", padding: "0px", margin: "10px", textAlign: "center" }} alt="card" src={workshop.imageUrl} />
                            : workshop.imageName ?
                                <img style={{ width: "100px", height: "100px", borderRadius: "10px", padding: "0px", margin: "10px", textAlign: "center" }} alt="card" src={`https://icaf-2021-proposalss.s3.amazonaws.com/${workshop.imageName}`} />
                                : <h6>Image not selected</h6>
                        }
                        <br />
                        <Button type="submit" variant="dark" className="workshop1-button">Submit</Button>
                    </Form>
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
export default WorkshopEditor;