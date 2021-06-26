import React, { Component } from 'react';
import { Col, Container, Row, Modal, Spinner, Card } from 'react-bootstrap';
import moment from "moment";
import WorkshopDataService from './WorkshopDataService'
import ReviewWorkshopDataService from '../ReviewWorkshop/ReviewWorkshopDataService';

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
                imageName: '',
                conductor: '',
                conductorName: ''
            }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getProposalById()
    }
    //
    getConductorName = () => {
        const { workshop } = this.state
        console.log(workshop.conductor)
        WorkshopDataService.getConductorData(workshop.conductor)
            .then((res) => {
                this.setState({ conductorName: res.data.fname + " " + res.data.lname })
            })
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
                this.getConductorName()
                this.setState({ loading: false })
            })
    }
    render() {
        const { workshop } = this.state
        return (
            <div>
                <Container style={{ minHeight: '600px' }}>
                    <Card style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <img src={`https://icaf-2021-proposalss.s3.amazonaws.com/${workshop.imageName}`} style={{ maxwidth: "400px", maxHeight: '300px' }} />
                        <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
                            <h3>{workshop.subject}</h3>
                            <p>{workshop.description}</p>
                            <h6>Venue  : {workshop.venue}</h6>
                            <h6>Dr. {workshop.conductorName}</h6>
                            <a style={{ textDecoration: "none" }} href={workshop.conductor} >{workshop.conductor}</a>
                            <Row style={{ marginTop: '25px' }}>
                                <Col>
                                    Date : {workshop.date}
                                </Col>
                                <Col>
                                    Time  :  {moment(workshop.time, "HH:mm:ss").format("LT")}
                                </Col>
                            </Row>
                        </div>
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