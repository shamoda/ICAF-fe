import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './ImportantDates.css'

class ImportantDates extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="workshops-title">
                    IMPORTANT DATES
                </div>

                <Container>

                    <div className="importantdates-div">
                        <Row xs={1} md={2} className="importantdates-row importantdates-date">
                            <Col className="importantdates-col">
                                01st January 2021
                            </Col>
                            <Col className="importantdates-col importantdates-title">
                                Paper Submission (Open)
                            </Col>
                        </Row>

                        <Row xs={1} md={2} className="importantdates-row importantdates-date">
                            <Col className="importantdates-col importantdates-title">
                                Paper Submission (Close)
                            </Col>
                            <Col className="importantdates-col">
                                01st March 2021
                            </Col>
                        </Row>

                        <Row xs={1} md={2} className="importantdates-row importantdates-date">
                            <Col className="importantdates-col">
                                08th April 2021
                            </Col>
                            <Col className="importantdates-col importantdates-title">
                                Acceptance Notification
                            </Col>
                        </Row>

                        <Row xs={1} md={2} className="importantdates-row importantdates-date">
                            <Col className="importantdates-col importantdates-title">
                                Complete Registration
                            </Col>
                            <Col className="importantdates-col">
                                01st June 2021
                            </Col>
                        </Row>

                        <Row xs={1} md={2} className="importantdates-row importantdates-date">
                            <Col className="importantdates-col">
                                4th, 5th and 6th July 2021
                            </Col>
                            <Col className="importantdates-col importantdates-title">
                                Conference
                            </Col>
                        </Row>
                    </div>

                </Container>
            </div>
         );
    }
}
 
export default ImportantDates;