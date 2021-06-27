import React, { Component } from 'react';
import { Modal, Spinner, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Authentication from '../../authentication/Authentication';
import WorkshopConducorProfileDataService from './WorkshopConducorProfileDataService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons'
import './WorkshopConductorProfile.css'
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
                postComment: '',
                aComment: ''
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
                workshop["aComment"] = res.data.acomment
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
                <Card border="dark" className="conductor-profile-card">
                    <Card.Header>ICAF 2021 WORKSHOPS</Card.Header>
                    <Card.Body>
                        <Card.Title>  <Badge style={{ fontSize: 15 }} variant="dark">{workshop.workshopId}</Badge></Card.Title>
                        <div style={{ marginTop: '-40px', marginLeft: '350px' }}>
                            {workshop.status == "pending" ? <Badge variant="warning" style={{ fontSize: 15, marginLeft: '500px' }}>{workshop.status}</Badge> : ""}
                            {workshop.status == "rejected" ? <Badge variant="danger" style={{ fontSize: 15, marginLeft: '500px' }}>{workshop.status}</Badge> : ""}
                            {workshop.status == "approved" ? <Badge variant="success" style={{ fontSize: 15, marginLeft: '500px' }}>{workshop.status}</Badge> : ""}
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
                            {workshop.aComment ?
                                <div>
                                    <h6 style={{ marginTop: '20px' }}>Admin Comment :  </h6>
                                    {workshop.aComment}
                                </div>
                                : ''
                            }
                            <div style={{ marginTop: '10px' }}>
                                {workshop.publish === 'pending' ? <Badge variant="warning">Post is in pending state !!!</Badge> : ""}
                                {workshop.publish === 'unpublished' ? <Badge variant="danger">Post is in unpublished state !!!</Badge> : ""}
                                {workshop.publish === 'published' ? <Badge style={{ width: '220px' }} variant="light"><FontAwesomeIcon icon={faImages} /><Link to={`workshops/${workshop.workshopId}`}><h6>Click to go to Published post</h6></Link></Badge> : ""}
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