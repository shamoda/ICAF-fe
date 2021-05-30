import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import authentication from '../../authentication/authentication';
import AuthenticationDataService from '../../authentication/AuthenticationDataService';
import Authentication from '../../authentication/Authentication';
import './Login.css'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            password: '',
            error: null
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

        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        AuthenticationDataService.login(formData)
            .then(response => {
                if (response.data != null) {
                    Authentication.successfulLogin(response.data)
                    if (Authentication.loggedAsResearcher()) {
                        this.props.history.push('/');
                    } else if (Authentication.loggedAsWorkshopConductor()) {
                        this.props.history.push('/');
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
                this.errorOccured("Invalid Email or Password")
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
                        <Button type="submit" variant="dark" className="login-button">Login</Button>
                        {this.state.error && <p className="login-error">{this.state.error}</p>}
                    </Form>
                </Container>
            </div>
         );
    }
}
 
export default Login;