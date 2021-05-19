import React, { Component } from 'react';
import { Col, Container, Row, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './Papers.css'

class Papers extends Component {

    constructor(props){
        super(props);
        this.state = { }

        this.submitPaperClicked = this.submitPaperClicked.bind(this);
    }

    submitPaperClicked() {
        return this.props.history.push('/paperregistration');
    }

    render() { 
        return ( 
            <div>
                <div className="papers-title">
                    CALL FOR PAPERS
                </div>

                <Container className="papers-container">
                    <div className="papers-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                        lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                        Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                        efficitur a orci. Integer at placerat velit. Nunc vehicula tristique elit sed suscipit. Mauris varius 
                        odio ut lacus interdum, ac mollis elit lobortis. Maecenas fermentum blandit odio nec interdum. Nunc 
                        efficitur diam nulla, hendrerit egestas augue dapibus eu. Donec vitae iaculis neque. Proin fermentum 
                        lectus purus, eget auctor mi gravida ut. Vivamus pellentesque est at ante tempor, sit amet sollicitudin 
                        orci mollis.
                    </div>

                    <div className="papers-topics">
                        <h4>Conference Topics</h4>
                        <Row>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>React JS</ListGroup.Item>
                                    <ListGroup.Item>Angular</ListGroup.Item>
                                    <ListGroup.Item>Vue</ListGroup.Item>
                                    <ListGroup.Item>Electron</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Spring Boot</ListGroup.Item>
                                    <ListGroup.Item>Express JS</ListGroup.Item>
                                    <ListGroup.Item>Koa JS</ListGroup.Item>
                                    <ListGroup.Item>Laravel</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>ASP.NET</ListGroup.Item>
                                    <ListGroup.Item>Django</ListGroup.Item>
                                    <ListGroup.Item>Ruby on Rails</ListGroup.Item>
                                    <ListGroup.Item>ReactiveX JS</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="papers-topics">
                        <h4>Submissions</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                            efficitur a orci. Integer at placerat velit.
                        </p>
                    </div>

                    <div className="papers-topics">
                        <h4>Important</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                            efficitur a orci. Integer at placerat velit.
                        </p>
                    </div>

                    <div className="papers-topics">
                        <Button variant="dark" className="papers-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileDownload } />&nbsp; Download Template</Button>
                        <Button onClick={this.submitPaperClicked} variant="dark" className="papers-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileUpload } />&nbsp; Submit My Paper</Button>
                    </div>

                </Container>
            </div>
         );
    }
}
 
export default Papers;