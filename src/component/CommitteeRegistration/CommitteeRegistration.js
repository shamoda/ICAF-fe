import React, { Component } from 'react';
import  { Form, Container, Button, MOdle, Spinner } from 'react-bootstrap';
import CommitteeRegistrationDataService from './CommitteeRegistrationDataService'
import './CommitteeRegistration.css'
import swal from 'sweetalert';

class CommitteeRegistration extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            contact: '',
            role: '',
            password: '',
            loading: false,
            error: null
        }

        this.registerCommitteMember = this.registerCommitteMember.bind(this);
        this.displayError = this.displayError.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.idGenerator = this.idGenerator.bind(this);

    }
        registerCommitteMember(event) {
            event.preventDefault();

            this.idGenerator() //genrate passowrd

            if (this.state.email === '') {
                this.displayError('Email connot be empty')
            } else if (this.state.name === ''){
                this.displayError('Name connot be empty')
            } else if (this.state.contact === ''){
                this.displayError('Contact number connot be empty')
            } else if (this.state.role === ''){
                this.displayError('role is not selected')
            } else if (this.state.password === ''){
                this.displayError('Password cannot be null')
            } else {
                
                this.setState({loading:true})

                let formData = new FormData();
                formData.append('email', this.state.email);
                formData.append('name', this.state.name);
                formData.append('contact', this.state.contact);
                formData.append('rolse', this.state.role);
                formData.append('password', this.state.password);

                CommitteeRegistrationDataService.registerCommitteMember(formData)
                    .then( responce => {
                        this.setState({loading: false})
                        swal({
                            title: "Paper Submission Successful!",
                            text: "Log in to your profile to stay up to date",
                            icon: "success",
                            button: "Login",
                        }).then(result => {
                            return this.history.push('/login')
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
            error:msg
        })
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        }, () => console.log(this.state))
        
    };

    idGenerator = event =>{
        this.setstate({
            password: Math.floor(100000 + Math.random() * 900000)
        }) 
      
    }

    render() { 
        return ( 
            <div>
                <div className="committeeregistration-title">
                    COMMITTEE REGISTATION    
                </div>  

                   
                <Container className="Committeeregistration-Container">
                    <Form autoComplete="off" onSubmit={this.registerCommitteMember}>
                        <Form.Group controlId="email" className="committeregistration-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="text" placeholder="committe member email" className="committeeregistration-form-input"/>
                            <Form.Text classname="test-muted">
                                
                            </Form.Text>  
                        </Form.Group>

                        <Form.Group controlId="name" className="committeregistration-form-group">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="name" value={this.state.author} type="text" placeholder="committe member name" className = "paperregistration-form-input" />
                            <Form.Text className="text-muted">
                                Enter your name in correct format.(ex: "J. Doe")
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="contact" className="pcommitteregistration-form-group">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control onChange={this.handleChange} name="contact" value={this.state.author} type="text" placeholder="committe member contact number" className = "paperregistration-form-input" />
                            
                        </Form.Group>

                        <Form.Group controlId="role" className="committeregistration-form-group">
                            <Form.Label>Choose your role</Form.Label>
                            <Form.Control onChange={this.handleChange} name="role" value={this.state.role} as="select"  className = "paperregistration-form-input" required>
                            <option value="">-- select your role --</option>
                            <option>Reviewer</option>
                            <option>Editor</option>
                            <option>Admin</option>
                            </Form.Control>
                            
                        </Form.Group>
                     
                        <Button type="submit" variant="dark" className="Committeeregistration-button">Submit</Button>
                        {this.state.error && <p className="Committeeregistration-error">{this.state.error}</p>}
                    </Form>
                </Container>



                
            </div>
         );
    }
}
 
export default CommitteeRegistration;