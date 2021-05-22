import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import PaperRegistrationDataService from './PaperRegistrationDataService'
import './PaperRegistration.css'

class PaperRegistration extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            title: '',
            author: '',
            paperAbstract: '',
            name: '',
            email: '',
            contact: '',
            password: '',
            temppassword: '',
            paper: null,
            error: null,
            loading: false
         }

        this.registerResearcher = this.registerResearcher.bind(this);
        this.displayError = this.displayError.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    registerResearcher(event) {
        event.preventDefault();

        if (this.state.title === '') {
            this.displayError('Title cannot be empty')
        } else if (this.state.author === '') {
            this.displayError('Author(s) cannot be empty')
        } else if (this.state.paperAbstract === '') {
            this.displayError('Paper abstract cannot be empty')
        } else if (this.state.name === '') {
            this.displayError('Contact name cannot be empty')
        } else if (this.state.email === '') {
            this.displayError('Email cannot be empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact number cannot be empty')
        } else if (this.state.password === '') {
            this.displayError('Password cannot be empty')
        } else if (this.state.temppassword === '') {
            this.displayError('Please re-enter password')
        } else if (this.state.paper == null) {
            this.displayError('You must upload your research paper')
        } else if (this.state.password != this.state.temppassword) {
            this.displayError('The passwords you entered do not match. Please re-enter your password')
        } else if (this.state.title.length < 20) {
            this.displayError('Title is too short')
        } else if (this.state.paperAbstract.length < 100) {
            this.displayError('Paper abstract is too short')
        } else if (this.state.contact.length != 10) {
            this.displayError('Invalid phone number')
        } else {

            this.setState({loading: true})

            let formData = new FormData();
            formData.append('title', this.state.title);
            formData.append('author', this.state.author);
            formData.append('paperAbstract', this.state.paperAbstract);
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('password', this.state.password);
            formData.append('paper', this.state.paper);

            PaperRegistrationDataService.registerResearcher(formData)
                .then( response => {
                    this.setState({loading: false})
                    swal({
                        title: "Registration Successful!",
                        text: "Log in to your profile to stay up to date",
                        icon: "success",
                        button: "Login",
                      }).then(result => {
                        return this.props.history.push('/login')
                      })
                })
                .catch( error => {
                    this.setState({loading: false})
                    swal({
                        title: "Oops!",
                        text: "Something went wrong, please try again.",
                        icon: "error",
                        button: "Ok",
                      })
                })

        }
    }

    displayError(msg) {
        this.setState({
            error: msg
        })
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        }, () => console.log(this.state));
    };

    onFileChange(event) {
        if (event.target.files.length) {
            this.setState({
                paper: event.target.files[0],
                error: null
            }, () => console.log('File selected'));
        }
    }

    render() { 
        return ( 
            <div>
                <div className="paperregistration-title">
                    RESEARCH PAPER SUBMISSION
                </div>

                <Container className="paperregistration-container">
                    <Form autoComplete="off" onSubmit={this.registerResearcher}>
                        <Form.Group controlId="title" className="paperregistration-form-group">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={this.handleChange} name="title" value={this.state.title} type="text" placeholder="research paper title" className = "paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                This title will be used in the future reference
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="author" className="paperregistration-form-group">
                            <Form.Label>Author(s)</Form.Label>
                            <Form.Control onChange={this.handleChange} name="author" value={this.state.author} type="text" placeholder="research contribution" className = "paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Separate each author's name with a pipe symbol (ex: "J. Doe | A. Marry")
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="paperAbstract" className="paperregistration-form-group">
                            <Form.Label>Abstract</Form.Label>
                            <Form.Control onChange={this.handleChange} name="paperAbstract" value={this.state.paperAbstract} maxLength="650"  as="textarea" rows={5} placeholder="abstract about your research" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="name" className="paperregistration-form-group">
                            <Form.Label>Contact Person Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="contact person name" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="email" className="paperregistration-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="we will contact you via this email" className = "paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Use this email to login to your profile
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="contact" className="paperregistration-form-group">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="we will contact you via this number" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="password" className="paperregistration-form-group">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="password" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="temppassword" className="paperregistration-form-group">
                            <Form.Label>Re-Enter Password</Form.Label>
                            <Form.Control onChange={this.handleChange} name="temppassword" value={this.state.temppassword} type="password" placeholder="re-enter password" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group className="paperregistration-form-group">
                            <Form.File name="paper" label="Attach Research Paper" onChange={this.onFileChange}  accept=".pdf" />
                            <Form.Text className="text-muted">
                                File format: PDF
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" variant="dark" className="paperregistration-button">Submit</Button>
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
 
export default PaperRegistration;