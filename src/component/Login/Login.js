import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import './Login.css'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            password: '',
            error: null
         }

        // this.registerResearcher = this.registerResearcher.bind(this);
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
                    <Form autoComplete="off" onSubmit={this.registerResearcher}>
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