import React, { Component } from 'react';
import { Modal,Spinner, Button, Card, Row, Col } from 'react-bootstrap';
import WorkshopCard from './WorkshopCard';
import WorkshopConducorProfileDataService from './WorkshopConducorProfileDataService';

class WorkshopConductorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals:[],
            loading: false,
            currentPage: 1,
            entriesPerPage: 5,
        }
        this.getWorkshops = this.getWorkshops.bind(this)
    }
    
    componentDidMount(){
      this.getWorkshops()
    }

    getWorkshops(){
        this.setState({loading:true})
        WorkshopConducorProfileDataService.getProposal()
        .then((response) => {
            this.setState({proposals:response.data})
            this.setState({loading:false})
        })
    }

    //pagination
    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.proposals.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.proposals.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.proposals.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };
    render() {
        const { currentPage, entriesPerPage, proposals, search } = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = proposals.slice(firstIndex, lastIndex);
        const totalPages = proposals.length / entriesPerPage;

        const pageNumCss = {
            width: "45px",
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "white",
            borderColor: "black"
        }
     
        return (
            <div>
                <div className="workshops-title">
                    EDITOR PORTAL
                </div>
                <Row style={{ maxWidth: '100%' }}>
                    <Col >
                        <div style={{ marginTop: '40px', marginLeft: '20px' }}>
                          <WorkshopCard
                           currentEntries={currentEntries}
                           lastIndex={lastIndex}
                           firstIndex={firstIndex}
                           totalPages={totalPages}  
                           pageNumCss={pageNumCss}
                           currentPage={currentPage}
                           entriesPerPage={entriesPerPage}
                           nextPage={this.nextPage}
                           firstPage={this.firstPage}
                           lastPage={this.lastPage}
                           prevPage={this.prevPage}
                          />
                        </div>
                    </Col>
                    <Col>
                        <Card border="dark" style={{ width: '500px', height: '500px', marginBottom: '30px', marginTop: '20px', marginLeft: '200px' }}>
                            <Card.Header>ICAF 2021 WORKSHOPS</Card.Header>
                            <Card.Body>
                                <Card.Title>  <Button style={{ fontSize: 10 }} variant="dark">ICAF_20201_3</Button></Card.Title>
                                <div style={{ marginTop: '-40px', marginLeft: '350px' }}>
                                    <Button style={{ fontSize: 15 }} variant="danger">PENDING</Button>
                                </div>
                                <Card.Text style={{ marginTop: '20px' }}>
                                    <h5 style={{ marginTop: '20px' }}>REACTJS LIFE</h5>
                                    <h6 style={{ marginTop: '20px' }}>React core and Styled Components</h6>
                                    <div>
                                        React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

                                        Declarative views make your code more predictable and easier to debug.
                                    </div>
                                    <h6 style={{marginTop:'40px'}}>Reviewer Comment</h6>
                                    <div>
                                        React makes it painless to create interactive UIs.
                                      
                                    </div>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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