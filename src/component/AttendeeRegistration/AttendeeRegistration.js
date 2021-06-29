import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { PayPalButton } from "react-paypal-button-v2";
import swal from 'sweetalert';
import './AttendeeRegistration.css'
import AttendeeRegistrationDataService from './AttendeeRegistrationDataService';

class AttendeeRegistration extends Component {

    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            contact: '',
            password: '',
            temppassword: '',
            organization: '',
            address: '',
            error: null,
            loading: false,
            notPaid: true
         }

        this.registerAttendee = this.registerAttendee.bind(this);
        this.displayError = this.displayError.bind(this);
        this.payBtnClicked = this.payBtnClicked.bind(this);
    }

    payBtnClicked() {
        this.setState({notPaid: !this.state.notPaid})
    }

    registerAttendee(event) {
        event.preventDefault();

        if (this.state.name === '') {
            this.displayError('Name cannot be empty')
        } else if (this.state.email === '') {
            this.displayError('Email cannot be empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact number cannot be empty')
        } else if (this.state.password === '') {
            this.displayError('Password cannot be empty')
        } else if (this.state.temppassword === '') {
            this.displayError('Please re-enter password')
        } else if (this.state.address === '') {
            this.displayError('Address cannot be empty')
        } else if (this.state.password != this.state.temppassword) {
            this.displayError('The passwords you entered do not match. Please re-enter your password')
        } else if (this.state.contact.length != 10) {
            this.displayError('Invalid phone number')
        } else {

            this.setState({loading: true})
            
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('password', this.state.password);
            formData.append('organization', this.state.organization);
            formData.append('address', this.state.address);

            AttendeeRegistrationDataService.registerAttendee(formData)
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
                    text: "Seems your email address is already exists. Please try again.",
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

    render() { 
        return ( 
            <div>
                <div className="attendeeregistration-title">
                    CONFERENECE REGISTRATION
                </div>

                <Container className="attendeeregistration-container">
                    <Form autoComplete="off" onSubmit={this.registerAttendee}>
                        <Form.Group controlId="name" className="attendeeregistration-form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="your name" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="email" className="attendeeregistration-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="we will contact you via this email" className = "attendeeregistration-form-input" />
                            <Form.Text className="text-muted">
                                Use this email to login to your profile
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="organization" className="attendeeregistration-form-group">
                            <Form.Label>Organization (optional)</Form.Label>
                            <Form.Control onChange={this.handleChange} name="organization" value={this.state.organization} type="text" placeholder="organization you are representing" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="contact" className="attendeeregistration-form-group">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="we will contact you via this number" className = "attendeeregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="address" className="attendeeregistration-form-group">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={this.handleChange} name="address" value={this.state.address} type="text" placeholder="contact person name" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="password" className="attendeeregistration-form-group">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="password" className = "attendeeregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="temppassword" className="attendeeregistration-form-group">
                            <Form.Label>Re-Enter Password</Form.Label>
                            <Form.Control onChange={this.handleChange} name="temppassword" value={this.state.temppassword} type="password" placeholder="re-enter password" className = "attendeeregistration-form-input" />
                        </Form.Group>
                        <p style={{color: "black", fontWeight: "600"}}>Registration Fee: $25.00</p>
                        <div className="attendeeregistration-paypal">
                            {this.state.notPaid ? <PayPalButton
                                style={{layout: "horizontal", color: "gold", height: 40, tagline: "true", label: "pay"}}
                                amount="25.00"
                                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details) => {
                                    // alert("Transaction completed by " + details.payer.name.given_name);
                                    this.setState({notPaid: !this.state.notPaid})
                                    // OPTIONAL: Call your server to save the transaction
                                    // return fetch("/paypal-transaction-complete", {
                                    //     method: "post",
                                    //     body: JSON.stringify({
                                    //         orderID: data.orderID
                                    //     })
                                    // });
                                }}
                            /> : <p style={{color: "green", fontWeight: "600", textAlign: "left"}}><FontAwesomeIcon icon={faCheckCircle} /> Paid</p>}
                            </div>
                            {/* <p style={{color: "black", fontWeight: "600"}}>Registration Fee: $25.00</p> */}
                            {/* <Button onClick={this.payBtnClicked} variant="dark" className="attendeeregistration-button" disabled={!this.state.notPaid}>Pay</Button> */}
                            {/* <FontAwesomeIcon className="attendeeregistration-arrow" icon={faArrowDown} /> <br/> */}
                            <Button type="submit" className="attendeeregistration-button" disabled={this.state.notPaid}>Register</Button>
                            {this.state.error && <p className="attendeeregistration-error">{this.state.error}</p>}
                        
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
 
export default AttendeeRegistration;