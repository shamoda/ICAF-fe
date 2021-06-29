import React, { Component } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import './CommitteeRegistration.css'
import CommitteeRegistrationDataService from './CommitteeRegistrationDataService';

class CommitteeRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            contact: '',
            role: '',
            password: '',
            error: null,
            loading: false
        }

        this.registerUser = this.registerUser.bind(this);
        this.displayError = this.displayError.bind(this);
        this.initialState = this.initialState.bind(this);
    }

    registerUser(pwd) {

        if (this.state.name === '') {
            this.displayError('Contact name cannot be empty')
        } else if (this.state.email === '') {
            this.displayError('Email cannot be empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact number cannot be empty')
        } else if (this.state.role === '') {
            this.displayError('Please select a role')
        } else if (this.state.contact.length != 10) {
            this.displayError('Invalid phone number')
        } else {
            this.setState({ loading: true }, () => console.log(pwd))

            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('role', this.state.role);
            formData.append('password', pwd);

            CommitteeRegistrationDataService.committeRegistration(formData)
                .then(response => {
                    this.setState({ loading: false })
                    swal({
                        title: "New Committee Member Added",
                        icon: "success",
                        button: "Ok",
                    })
                    this.initialState()
                })
                .catch(error => {
                    this.setState({ loading: false })
                    swal({
                        title: "Oops!",
                        text: "Seems your email address is already exists. Please try again.",
                        icon: "error",
                        button: "Ok",
                    })
                    this.initialState()
                })
        }
    }

    initialState() {
        this.setState({
            name: '',
            email: '',
            contact: '',
            role: '',
            password: '',
            error: null,
            loading: false
        })
    }

    displayError(msg) {
        this.setState({
            error: msg
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: null
        }, () => console.log(this.state));
    };

    render() {
        return (
            <div>
                <Container>
                    <Form autoComplete="off">
                        <Form.Group controlId="name" className="paperregistration-form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="name" className="paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Committee member's name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="email" className="paperregistration-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="email" className="paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Committee member's email | Auto-generated password will be sent to this email
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="contact" className="paperregistration-form-group">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="contact number" className="paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Committee member's name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="role" className="paperregistration-form-group">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                custom
                                onChange={this.handleChange}
                                name="role"
                                value={this.state.role}
                            >
                                <option value="">- select -</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Administrator</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Committee member's role
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={() => this.registerUser(Math.floor(100000 + Math.random() * 900000))} variant="dark" className="paperregistration-button">Save</Button>
                        {this.state.error && <p className="paperregistration-error">{this.state.error}</p>}
                    </Form>
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

export default CommitteeRegistration;