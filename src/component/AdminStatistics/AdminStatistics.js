import React, { Component } from 'react';
import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { Pie, Doughnut } from 'react-chartjs-2'
import AdminStatisticsDataService from './AdminStatisticsDataService'

class AdminStatistics extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            attendees : '',
            allResearchers : '',
            allWorkshops : '',
            publishedPapers : '',
            publishedWorkshops : '',
        }

        this.refreshAnalytics = this.refreshAnalytics.bind(this);
    }

    refreshAnalytics() {
        AdminStatisticsDataService.getAnalytics()
            .then(res => {
                this.setState({
                    attendees : res.data.attendees,
                    allResearchers : res.data.allResearchers,
                    allWorkshops : res.data.allWorkshops,
                    publishedPapers : res.data.publishedPapers,
                    publishedWorkshops : res.data.publishedWorkshops
                }, () => console.log(this.state))
            })
    }

    componentDidMount() {
        this.refreshAnalytics()
    }

    render() { 
        return ( 
            <div>
                <Container style={{marginTop: "40px"}}>
                    <Row>
                        <Col>
                            <Jumbotron style={{paddingTop: "20px", paddingBottom: "20px", borderRadius: "10px", marginTop: "40px", marginBottom: "40px"}} fluid>
                                <Container>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}>Attendees</Col><Col style={{textAlign: "center"}}>{this.state.attendees}</Col></Row>
                                    </Card>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}>Published Papers</Col><Col style={{textAlign: "center"}}>{this.state.publishedPapers} out of {this.state.allResearchers}</Col></Row>
                                    </Card>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}>Published Workshops</Col><Col style={{textAlign: "center"}}>{this.state.publishedWorkshops} out of {this.state.allWorkshops}</Col></Row>
                                    </Card>
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col>
                            <Doughnut
                                data={{
                                labels: ['Attendees', 'Researches', 'Workshops'],
                                datasets: [
                                    {
                                    label: '# of participants',
                                    data: [this.state.attendees, this.state.publishedPapers, this.state.publishedWorkshops],
                                    backgroundColor: [
                                        'rgba(128, 255, 138, 0.8)',
                                        'rgba(255, 146, 138, 0.8)',
                                        'rgba(173, 146, 255, 0.8)',
                                    ],
                                    borderWidth: 1,
                                    }
                                ],
                                }}
                                height={300}
                                width={300}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                        fontSize: 25,
                                        },
                                    },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
         );
    }
}
 
export default AdminStatistics;