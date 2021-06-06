import React, { Component } from 'react';
import { Col, Container, Row, Modal, Spinner, Card } from 'react-bootstrap';
import WorkshopDataService from './WorkshopDataService'

class WorkshopDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            workshop: {
                workshopId: this.props.match.params.id,
                title: '',
                description: '',
                date: '',
                venue: '',
                status: '',
                time: '',
                imageName: ''
            }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getProposalById()
    }

    getProposalById = () => {
        this.setState({ loading: true })
        const { workshop } = this.state
        WorkshopDataService.getWorkshopById(workshop.workshopId)
            .then((res) => {
                workshop["workshopId"] = res.data.workshopId
                workshop["title"] = res.data.title
                workshop["subject"] = res.data.subject
                workshop["description"] = res.data.description
                workshop["conductor"] = res.data.conductor
                workshop["date"] = res.data.date
                workshop["venue"] = res.data.venue
                workshop["status"] = res.data.status
                workshop["time"] = res.data.time
                workshop["imageName"] = res.data.imageName
                this.setState({
                    workshop,
                })
                this.setState({ loading: false })
            })
    }
    render() {
        const { workshop } = this.state
        return (
            <div>
                <Container>
                    <Card style={{ marginLeft: "-50px", width: "1100px", marginTop: "80px", height: "500px", marginBottom: '20px' }}>
                        <Row>
                            <Col>
                                <img src={`https://icaf-2021-proposalss.s3.amazonaws.com/${workshop.imageName}`} style={{ width: "400px", marginTop: "60px", marginLeft: "40px" }} />
                            </Col>
                            <Col style={{ marginLeft: "30px", marginTop: "50px" }}>
                                <h1>{workshop.title}</h1>
                                <h3>{workshop.subject}</h3>
                                <p>{workshop.description}</p>
                                <h6>Venue  : {workshop.venue}</h6>
                                <h6>Prof. Myra Richards</h6>
                                <a style={{ textDecoration: "none" }} href={workshop.conductor} >{workshop.conductor}</a>
                                <Row style={{ marginTop: '25px' }}>
                                    <Col>
                                        Date : {workshop.date}
                                    </Col>
                                    <Col>
                                        Time : {workshop.time}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Container>
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default WorkshopDetails;