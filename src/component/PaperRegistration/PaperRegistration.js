import React, { Component } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import './PaperRegistration.css'

class PaperRegistration extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="paperregistration-title">
                    RESEARCH PAPER SUBMISSION
                </div>

                <Container className="paperregistration-container">
                    <Form autoComplete="off">
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
                        <Form.Group controlId="abstract" className="paperregistration-form-group">
                            <Form.Label>Abstract</Form.Label>
                            <Form.Control onChange={this.handleChange} name="abstract" value={this.state.abstract} maxlength="650"  as="textarea" rows={5} placeholder="abstract about your research" className = "paperregistration-form-input" />
                        </Form.Group>
                        <Form.Group controlId="email" className="paperregistration-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="we will contact you via this email" className = "paperregistration-form-input" />
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
                        <Button variant="dark" className="paperregistration-button">Submit</Button>
                    </Form>
                </Container>

            </div>
         );
    }
}
 
export default PaperRegistration;