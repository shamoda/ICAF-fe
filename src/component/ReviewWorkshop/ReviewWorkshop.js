import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFastBackward, faFastForward, faFilePdf, faSave, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import ReviewWorkshopDataService from './ReviewWorkshopDataService';
class ReviewWorkshop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            rComment: '',
            status: '',
            currentPage: 1,
            entriesPerPage: 5,
            search: '',
            searchMessage: null,
            loading: false
        }
        this.refreshProposal = this.refreshProposal.bind(this);
        // this.submitClicked = this.submitClicked.bind(this);

        this.pushtoDetails = this.pushtoDetails.bind(this)
    }

    refreshProposal() {
        let example = {
            workshopTitle: this.state.search,
            status: "pending",
            workshopDescription: this.state.search
        }
        ReviewWorkshopDataService.getProposal(example)
            .then(response => {
                this.setState({ proposals: response.data })
            })
    }

    componentDidMount() {
        this.refreshProposal()
    }



    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    submitBtnClicked(email) {
        return this.props.submitBtnClicked(email)
    }

    pushtoDetails(id) {
        const { shifttoDetails } = this.props
        shifttoDetails(id)
    }

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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.refreshProposal());

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

        const searchBox = {
            width: "250px",
            fontWeight: "bold",
            border: "none",
            borderColor: "#24a0ed"
        }

        return (
            <div>

                <Container className="paperlist-container">
                    <Card className={""} style={{ backgroundColor: "white" }}>
                        <Card.Header style={{ backgroundColor: "white" }}>
                            <div style={{ float: "left", fontSize: "20px", fontWeight: "600" }}>
                                <FontAwesomeIcon icon={faFilePdf} />&nbsp; Workshop Proposals
                            </div>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={search} className="" />&nbsp;
                                </InputGroup>
                            </div>
                        </Card.Header>

                        <Card.Body style={{ backgroundColor: "white" }}>
                            <Table hover style={{ backgroundColor: "white" }} variant="">
                                <tbody>

                                    {this.state.proposals.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :
                                        currentEntries.map((proposal) => (
                                            <tr key={proposal.workshopID} >
                                                <td>
                                                    <Button style={{ fontSize: 10 }} variant="dark">{proposal.workshopID}</Button>

                                                </td>
                                                <td >
                                                    <h5>{proposal.workshopTitle}</h5>
                                                    <h6>By: {proposal.conductor}</h6>
                                                </td>
                                                <td>{proposal.workshopDescription}</td>
                                                <td style={{}}>
                                                    <Form autoComplete="off" >
                                                        <Button variant="outline-dark" onClick={() => this.pushtoDetails(proposal.workshopID)}><FontAwesomeIcon size="sm" icon={faEye} />&nbsp; View</Button>
                                                    </Form>
                                                </td>
                                            </tr>))
                                    }

                                </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer style={{ backgroundColor: "white", color: "black" }}>
                            <div style={{ float: "left" }}>
                                Showing Page {currentPage} of {Math.ceil(totalPages)}
                            </div>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className="" name="currentPage" value={currentPage} disabled />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                            Next <FontAwesomeIcon icon={faStepForward} />
                                        </Button>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                                            Last <FontAwesomeIcon icon={faFastForward} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                    </Card>
                </Container>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Downloading...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div >
        );
    }
}
export default ReviewWorkshop