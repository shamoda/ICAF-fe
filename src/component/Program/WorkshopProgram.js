import React, { Component } from 'react';
import ProgramDataService from './ProgramDataService';
import { Col, Container, Row, Modal, Spinner, Card, Button } from 'react-bootstrap';
import WorkshopCorousel from './WorkshopCorousel';

class WorkshopProgram extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proposals: [],
            loading: false,
            workshop: {
                workshopId: '',
                title: '',
                date: '',
                venue: '',
            }
        }
        this.getWorkshop = this.getWorkshop.bind(this)
    }

    componentDidMount() {
        this.getWorkshop()
    }

    getWorkshop() {
        let workshop = {
            status: 'pending'
        }
        this.setState({ loading: true })
        ProgramDataService.getWorkshop(workshop)
            .then((response) => {
                this.setState({ proposals: response.data })
                this.setState({ loading: false })
            })
    }

    render() {
        const { proposals } = this.state
        return (
            <div>
                <div className="workshops-title">
                    WORKSHOP PROGRAM
                </div>
                <Container className="workshops-container">
                    <Row>

                        <WorkshopCorousel />
                    </Row>
                    <Row>
                        <Col style={{ marginTop: '-40px' }}>
                            <div className={"row mt-4 pt-5"} >
                                <Row style={{ marginTop: '-5px', marginLeft: '-55px' }}>
                                    {proposals.map((p) => (
                                        <Col sm={4} className={"card-group mb-4"}>
                                            <Card >
                                                <Card.Img variant="top" src={`https://icaf-2021-proposalss.s3.amazonaws.com/${p.imageName}`} style={{ height: '100px' }}></Card.Img>
                                                <Card.Body>
                                                    <Card.Title>{p.title}</Card.Title>
                                                    <Card.Text>
                                                        {p.subject}
                                                    </Card.Text>
                                                    <Button variant="primary" onClick={() => this.props.history.push(`/workshops/${p.workshopId}`)}>Findout Now</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <Card border="dark" className="mb-2" style={{ Height: '800px', width: '400px', marginTop: '20px', marginBottom: '20px' }}>
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


                        </Col>

                    </Row>
                </Container>
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div >
        );
    }
}
export default WorkshopProgram;