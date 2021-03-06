import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Badge, Form, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFastBackward, faFastForward, faFilePdf, faSave, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import AdminDashboardDataService from './AdminDashboardDataService';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class AdminPostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            currentPage: 1,
            entriesPerPage: 5,
            search: '',
            searchMessage: null,
            loading: false
        }
        this.refreshWorkshops = this.refreshWorkshops.bind(this);
    }

    componentDidMount() {
        this.refreshWorkshops()
    }

    //Pagination
    refreshWorkshops() {
        let example = {
            edit: true,
            status: 'approved',
            title: this.state.search,
        }
        AdminDashboardDataService.getWorkshop(example)
            .then(response => {
                this.setState({ proposals: response.data })
            })
    }

    formChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log('form changed'));

    };
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
        }, () => this.refreshWorkshops());

    };

    render() {
        const { currentPage, entriesPerPage, proposals } = this.state;
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
                                    <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="Search by title..." name="search" value={this.state.search} className="" />&nbsp;
                                </InputGroup>
                            </div>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: "white" }}>
                            <Table hover style={{ backgroundColor: "white" }} variant="">
                                <tbody>
                                    {this.state.proposals.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :
                                        currentEntries.map((p) => (
                                            <tr key={p.workshopId}>
                                                <td style={{ padding: "30px" }}>
                                                    <Row>
                                                        <Col>
                                                            <Image style={{ maxHeight: '100px', maxWidth: '100px' }} src={`https://icaf-2021-proposals.s3.amazonaws.com/${p.imageName}`} rounded />
                                                        </Col>
                                                        <Col>
                                                            <h5>{p.title}</h5>
                                                            <h6>{p.subject}</h6>
                                                            <p style={{ margin: "5px 0px", fontSize: "12px" }}>By: {p.conductor}</p>
                                                        </Col>
                                                        <Col>
                                                            <p style={{ margin: "5px 0px" }}>
                                                                {p.publish === "pending" && <Badge variant="warning">{p.publish}</Badge>}
                                                                {p.publish === "published" && <Badge variant="success">{p.publish}</Badge>}
                                                                {p.publish === "unpublished" && <Badge variant="danger">{p.publish}</Badge>}
                                                            </p>
                                                            <div style={{ fontSize: 9 }}>Last modified on : {moment(p.editDate).format("MMMM Do YYYY, h:mm:ss a")}</div>
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td style={{ width: "15%", textAlign: "center", padding: "40px 10px" }}>
                                                    <Form autoComplete="off" >
                                                        <Button onClick={() => this.props.history.push(`/adminPost/${p.workshopId}`)} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faCheck} />&nbsp; Review</Button>
                                                    </Form>
                                                </td>
                                            </tr>
                                        ))
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
            </div>
        );
    }
}
export default withRouter(AdminPostList)