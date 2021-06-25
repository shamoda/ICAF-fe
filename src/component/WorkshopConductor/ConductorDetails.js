import React, { Component } from 'react';
import { Form, Container, Button, Modal, Spinner, Col, Row } from 'react-bootstrap';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkshopConductorDataService from './WorkshopConductorDataService';

class ConductorDetails extends Component {
    constructor(props) {
        super(props);
        //controlled inputs, should not be null as well..[ERR-LOG 01]
        this.state = {
            conductor: {
                fname: '',
                lname: '',
                address: '',
                city: '',
                eduQuali1: '',
                eduQuali2: '',
                organization: '',
                post: '',
                conductor: this.props.match.params.id,
                workshopId: this.props.match.params.workshop
            }
        }
        this.getConductor = this.getConductor.bind(this)
    }

    componentDidMount() {
        this.getConductor()
        window.scrollTo(0, 0)
    }

    getConductor() {
        const { conductor } = this.state
        WorkshopConductorDataService.getConductorData(conductor.conductor)
            .then((res) => {
                conductor["fname"] = res.data.fname
                conductor["lname"] = res.data.lname
                conductor["address"] = res.data.address
                conductor["city"] = res.data.city
                conductor["eduQuali1"] = res.data.eduQualification1
                conductor["eduQuali2"] = res.data.eduQualification2
                conductor["organization"] = res.data.organization
                conductor["post"] = res.data.post
                this.setState({
                    conductor
                });
            })
    }

    render() {
        const { conductor } = this.state
        return (
            <div>
                <div className="attendeeregistration-title">
                    WORKSHOP PROPOSOL
                </div>
                <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Button style={{ marginBottom: 10 }} variant="dark">{conductor.workshopId}</Button>
                    <h4>{conductor.conductor}</h4>
                    <h6>{conductor.fname + " " + conductor.lname}</h6>
                    <Row>
                        <Col >
                            Address:  &nbsp;;<h6>{conductor.address}</h6>
                        </Col>
                        <Col>
                            Organization:  &nbsp;<h6>{conductor.organization}</h6>
                        </Col>
                        <Col>
                            Post : &nbsp; <h6>{conductor.post}</h6>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 25 }}>
                        <Col>
                            Educational Qualification 1 :&nbsp;
                            {conductor.eduQuali1}
                        </Col>
                        <Col>
                            Educational Qualification 2 :&nbsp;
                            {conductor.eduQuali2}
                        </Col>
                    </Row>
                </Container>
                {/* <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal> */}
            </div >
        )
    }

}
export default ConductorDetails;