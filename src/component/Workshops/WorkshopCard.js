import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './Workshops.css'

class WorkshopCard extends Component {
    state = {

    }
    render() {
        const { downloadProposalClicked, submitWorkshopClicked } = this.props
        return (
            <Card style={{ Height: '800px', width: '450px', marginLeft: '-100px' }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title> Workshop Proposals </Card.Title>
                    <Card.Text>

                        <div className="workshops-topics">
                            <h4>Important</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                                lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                                Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                                efficitur a orci. Integer at placerat velit.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                                lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                                Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                                efficitur a orci. Integer at placerat velit.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                                lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                                Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                                efficitur a orci. Integer at placerat velit.
                        </p>
                        </div>

                        <div className="workshops-topics">
                            <Button variant="dark" onClick={downloadProposalClicked} className="workshops-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileDownload} />&nbsp; Download Proposal Template</Button>
                            <Button variant="dark" onClick={submitWorkshopClicked} className="workshops-button"><FontAwesomeIcon style={{ float: "right", marginTop: "3px" }} icon={faFileUpload} />&nbsp; Submit Workshop Proposal</Button>
                        </div>

                        <div className="workshops-email">
                            <h5>Please address all questions to the ICAF 2021 Workshops Chair</h5>
                            <Row className="workshops-row">
                                <Col>
                                    <h6>Prof. Myra Richards</h6>
                                    <a style={{ textDecoration: "none" }} href="mailto:m.richards@gmail.com" >m.richards@gmail.com</a>
                                </Col>
                                <Col>
                                    <h6>Dr. Steve Mclaughlin</h6>
                                    <a style={{ textDecoration: "none" }} href="mailto:steve.m@gmail.com" >steve.m@gmail.com</a>
                                </Col>
                            </Row>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default WorkshopCard;