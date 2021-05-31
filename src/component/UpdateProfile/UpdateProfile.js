import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUserLock } from '@fortawesome/free-solid-svg-icons'
import './UpdateProfile.css'
import UpdateProfileDataService from './UpdateProfileDataService';
import Authentication from '../../authentication/Authentication';

class UpdateProfile extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            email: '',
            name: '',
            contact: '',
            role: '',
            password: '',
            temppassword: '',
            error: null,
            loading: false
         }

        this.changePassword = this.changePassword.bind(this);
        // this.displayError = this.displayError.bind(this);
        // this.onFileChange = this.onFileChange.bind(this);
    }

    changePassword(event) {
        event.preventDefault();

        if (this.state.password === '') {
            this.displayError('Password cannot be empty')
        } else if (this.state.temppassword === '') {
            this.displayError('Please re-enter new password')
        } else if (this.state.password != this.state.temppassword) {
            this.displayError('The passwords you entered do not match. Please re-enter your password')
        } else {
            this.setState({loading: true})
            // let user = {
            //     email: sessionStorage.getItem('authenticatedUserEmail'),
            //     name: sessionStorage.getItem('authenticatedUserName'),
            //     contact: sessionStorage.getItem('authenticatedUserContact'),
            //     role: sessionStorage.getItem('authenticatedUserRole'),
            //     password: this.state.password
            // }

            let formData = new FormData();
            formData.append('email', sessionStorage.getItem('authenticatedUserEmail'));
            formData.append('password', this.state.password);

            console.log(formData)

            UpdateProfileDataService.updatePassword(formData)
                .then(response => {
                    this.setState({loading: false, password: '', temppassword: ''})
                    swal({
                        title: "Password Changed",
                        icon: "success",
                        button: "Got it",
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
        }, () => console.log('password changing'));
        
    };

    render() { 
        return ( 
            <Modal
            {...this.props}
            size="lg"
            scrollable={true}
            keyboard
            aria-labelledby="contained-modal-title-vcenter"
            centered
            portalClassName="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <FontAwesomeIcon size="sm" icon={faUserLock} />&nbsp; Change Password
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container style={{backgroundColor: ""}}>
                        <Form autoComplete="off" onSubmit={this.changePassword}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="password" className="updateprofile-form-group">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="password" className = "updateprofile-form-input" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="temppassword" className="updateprofile-form-group">
                                        <Form.Label>Re-Enter New Password</Form.Label>
                                        <Form.Control onChange={this.handleChange} name="temppassword" value={this.state.temppassword} type="password" placeholder="re-enter password" className = "updateprofile-form-input" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="updateprofile-col">
                                    <Button type="submit" variant="dark" className="updateprofile-button">Update</Button>
                                    {this.state.error && <p className="updateprofile-error">{this.state.error}</p>}
                                </Col>

                                
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                    <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>

            </Modal>
         );
    }
}
 
export default UpdateProfile;