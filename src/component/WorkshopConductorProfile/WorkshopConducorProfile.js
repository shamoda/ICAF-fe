import React, { Component } from 'react';
import { Modal, Spinner, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Authentication from '../../authentication/Authentication';
import WorkshopConducorProfileDataService from './WorkshopConducorProfileDataService';

class WorkshopConductorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: {
                id: Authentication.loggedUserId(),
                title: '',
                description: '',
                date: '',
                venue: '',
                status: '',
                time: '',
                rComment: '',
                publish: '',
                postComment: ''
            },
            loading: false,

        }
        this.getProposalById = this.getProposalById.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getProposalById()
        console.log(this.state.id)
    }

    getProposalById = () => {
        this.setState({ loading: true })
        const { workshop } = this.state
        WorkshopConducorProfileDataService.getProposal(this.state.workshop.id)
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
                workshop["rComment"] = res.data.rcomment
                workshop["publish"] = res.data.publish
                workshop["postComment"] = res.data.post_comment
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
                <div className="workshops-title">
                    WORKSHOP CONDUCTOR PORTAL
                </div>
                <Card border="dark" style={{ width: '1000px', height: '500px', marginBottom: '30px', marginTop: '20px', marginLeft: '200px' }}>
                    <Card.Header>ICAF 2021 WORKSHOPS</Card.Header>
                    <Card.Body>
                        <Card.Title>  <Button style={{ fontSize: 10 }} variant="dark">{workshop.workshopId}</Button></Card.Title>
                        <div style={{ marginTop: '-40px', marginLeft: '350px' }}>
                            <Button style={{ fontSize: 15, marginLeft: '500px' }} variant="danger">{workshop.status}</Button>
                        </div>
                        <Card.Text style={{ marginTop: '20px' }}>
                            <h5 style={{ marginTop: '20px' }}>{workshop.title}</h5>
                            <h6 style={{ marginTop: '20px' }}>{workshop.subject}</h6>
                            <div>
                                Description : {workshop.description}
                            </div>
                            {workshop.rComment ?
                                <div>
                                    <h6 style={{ marginTop: '40px' }}>Reviewer Comment :  </h6>
                                    {workshop.rComment}
                                </div>
                                : ''
                            }
                            <br />  <br />
                            {workshop.rComment ?
                                <div>
                                    <h6 style={{ marginTop: '40px' }}>Reviewer Comment :  </h6>
                                    {workshop.rComment}
                                </div>
                                : ''
                            }
                            <br />  <br />
                            <div>
                                {workshop.publish === 'published' ? <Button variant="danger"><Link to={`workshop/${workshop.workshopId}`}>Published post</Link></Button> : <Button variant="danger">Post is not published yet!!!</Button>}
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please Wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div >
        );
    }
}

export default WorkshopConductorProfile;