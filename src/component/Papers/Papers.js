import React, { Component } from 'react';
import { Col, Container, Row, ListGroup, Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import PapersDataService from './PapersDataService'
import './Papers.css'

class Papers extends Component {

    constructor(props){
        super(props);
        this.state = { loading: false }

        this.submitPaperClicked = this.submitPaperClicked.bind(this);
        this.downloadTemplateClicked = this.downloadTemplateClicked.bind(this);
    }

    submitPaperClicked() {
        return this.props.history.push('/paperregistration');
    }

    downloadTemplateClicked() {
        this.setState({loading: true})
        PapersDataService.downloadPaper()
            .then(({ data }) => {
                this.setState({loading: false})
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-research-paper-template.docx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Research Paper Template Downloaded",
                    icon: "success",
                    button: "Ok",
                  })
            });
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

                    <div className="papers-topics" style={{textAlign:"center"}}>
                        <Button onClick={this.downloadTemplateClicked} variant="dark" className="papers-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileDownload } />&nbsp; Download Template</Button>
                        <Button onClick={this.submitPaperClicked} variant="dark" className="papers-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileUpload } />&nbsp; Submit My Paper</Button>
                    </div>
                </Container>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                    <Modal.Title><Spinner animation="border" /> Downloading...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
         );
    }
}
 
export default Papers;