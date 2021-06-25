import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ProgramDataService from './ProgramDataService';
import { Col, Container, Row, Modal, Spinner, Card, Button } from 'react-bootstrap';
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            loading: false,
            workshop: {
                workshopId: '',
                title: '',
                date: '',
                venue: '',
                search: ''
            }
        }
        this.getWorkshop = this.getWorkshop.bind(this)
    }

    componentDidMount() {
        this.getWorkshop()
    }

    getWorkshop() {
        let workshop = {
            publish: 'published',
            status: 'approved'
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
            <div className={"row mt-4 pt-5"} >
                <Row >
                    {proposals.map((p) => (
                        <Col sm={3} className={"card-group mb-4"}>
                            <Card >
                                <Card.Img variant="top" src={`https://icaf-2021-proposalss.s3.amazonaws.com/${p.imageName}`} style={{ height: '80px' }}></Card.Img>
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
        )
    }
}
export default withRouter(PostList)
