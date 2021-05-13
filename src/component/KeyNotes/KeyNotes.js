import React, { Component } from 'react';
import {Card, Button, Container, CardDeck} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faLinkedin, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import './KeyNotes.css'
import p1 from '../../asset/p1.jpg';
import p2 from '../../asset/p2.jpg';
import p3 from '../../asset/p3.jpg';
import {Link} from "react-router-dom";

class KeyNotes extends Component {
    render() { 
        return ( 
            <div>
                <div className="keynotes-title">
                    KEY NOTES
                </div>
                <Container className="keynotes-speakers">
                    <CardDeck>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={p1} />
                            <Card.Body>
                                <Card.Title>Dr. Steve Mclaughlin</Card.Title>
                                <Card.Text>
                                    College of Engineering and Computing, Florida International University, USA
                                </Card.Text>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faLinkedin } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faTwitterSquare } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faFacebookSquare } className="fa-lg" /></Link>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={p2} />
                            <Card.Body>
                                <Card.Title>Prof. Myra Richards</Card.Title>
                                <Card.Text>
                                    Department of Psychological Medicine, University of Auckland
                                </Card.Text>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faLinkedin } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faTwitterSquare } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faFacebookSquare } className="fa-lg" /></Link>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={p3} />
                            <Card.Body>
                                <Card.Title>Prof. Lionel Brady</Card.Title>
                                <Card.Text>
                                    Mobility Systems and Civil Engineering, University of Technology, Sweden
                                </Card.Text>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faLinkedin } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faTwitterSquare } className="fa-lg" /></Link>
                                <Link className="keynotes-links"><FontAwesomeIcon icon={ faFacebookSquare } className="fa-lg" /></Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Container>
            </div>
         );
    }
}
 
export default KeyNotes;