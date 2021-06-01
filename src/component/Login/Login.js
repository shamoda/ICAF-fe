import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import authentication from '../../authentication/authentication';
import AuthenticationDataService from '../../authentication/AuthenticationDataService';
import Authentication from '../../authentication/Authentication';
import './Login.css'
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            password: '',
            error: null,
            loading: false,
         }

        this.loginClicked = this.loginClicked.bind(this);
        this.errorOccured = this.errorOccured.bind(this);
    }

    errorOccured(msg) {
        this.setState({error: msg})
    }

    loginClicked(event) {
        event.preventDefault();

        if (this.state.email === '') {
            this.errorOccured("Email cannot be empty")
            return
        } else if (this.state.password === '') {
            this.errorOccured("Password cannot be empty")
            return
        }

        this.setState({loading: true}, () => console.log(''))

        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        AuthenticationDataService.login(formData)
            .then(response => {
                this.setState({loading: false})
                if (response.data != null) {
                    Authentication.successfulLogin(response.data)
                    if (Authentication.loggedAsResearcher()) {
                        this.props.history.push('/researcherprofile');
                    } else if (Authentication.loggedAsWorkshopConductor()) {
                        this.props.history.push('/');
                    } else if (Authentication.loggedAsAttendee()) {
                        this.props.history.push('/program');
                    } else if (Authentication.loggedAsReviewer()) {

                    } else if (Authentication.loggedAsEditor()) {

                    } else if (Authentication.loggedAsAdmin()) {

                    } else {
                        this.errorOccured("Invalid Email or Password")
                    }
                } else {
                    this.errorOccured("Invalid Email or Password")
                }
            }).catch (error => {
                this.setState({loading: false})
                swal({
                    title: "Oops!",
                    text: "Something went wrong, please try again.",
                    icon: "error",
                    button: "Ok",
                  })
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
                <div className="login-title">
                    LOGIN
                </div>

                <Container className="login-container">
                    <Form autoComplete="off" onSubmit={this.loginClicked}>
                        <Form.Group controlId="email" className="login-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="email" className = "login-form-input" />
                            <Form.Text className="text-muted">
                                Registered Email
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="password" className="login-form-group">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="password" className = "login-form-input" />
                        </Form.Group>
                        <Button type="submit" variant="dark" className="login-button">Login</Button><br/>
                        {this.state.error && <p className="login-error">{this.state.error}</p>}
                        <Link style={{textDecoration: "none", fontSize: "14px", marginTop: "0px"}} to="/attendeeregistration">Don't have an account? Become an Attendee</Link>
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
 
export default Login;