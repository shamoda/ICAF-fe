import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleMaps from '../../Commons/GoogleMaps';
import "./Contact.css"

class Contact extends Component {

    render() { 
        return ( 
            <div>
                <div className="keynotes-title">
                    Contact Us
                </div>

                <Container className="contact-speakers">
                    <Row>
                        <Col>
                            <div>
                                <p className="contact-titles">Address</p>
                                <p>ICAF-2021 Organizing Committee,
                                    <br/> 2nd Floor, Main Building
                                    <br/> Sri Lanka Institute of Information Technology,
                                    <br/> Malabe, Sri Lanaka, 10115
                                </p>
                                <hr/>
                            </div>
                            <div>
                                <p className="contact-titles">Phone Number</p>
                                <p>0723451451</p>
                                <hr/>
                            </div>
                            <div>
                                <p className="contact-titles">Email</p>
                                <a href="mailto:info@icaf.com">info@icaf.com</a>
                                <hr/>
                            </div>
                        </Col>
                        <Col style={{paddingLeft:"20px", paddingRight:"20px"}}>
                            <GoogleMaps />
                        </Col>
                    </Row>
                </Container>
            </div>
         );
    }
}
 
export default Contact;