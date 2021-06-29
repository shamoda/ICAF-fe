import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Row, Col, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEdit, faEye, faFastBackward, faFastForward, faFilePdf, faSave, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import './ReviewPapers.css'
import ReviewPapersDataService from './ReviewPapersDataService';
import Authentication from '../../authentication/Authentication';

class ReviewPapers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            papers: [],
            rComment: '',
            status: '',

            currentPage: 1,
            entriesPerPage: 5,
            search: '',
            searchMessage: null,
            loading: false,
            role: sessionStorage.getItem('authenticatedUserRole')
        }

        this.refreshPapers = this.refreshPapers.bind(this);
        this.submitBtnClicked = this.submitBtnClicked.bind(this);
    }

    refreshPapers() {
        let example = {
            title: this.state.search,
            status: 'pending'
        }

        if (this.state.role === 'admin') {
            example.status = ''
        }

        ReviewPapersDataService.getResearchPapers(example)
            .then(response => {
                this.setState({ papers: response.data })
            })
    }

    componentDidMount() {
        this.refreshPapers()
    }

    downloadPaperTemplateClicked(fileName) {
        this.setState({ loading: true })
        ReviewPapersDataService.downloadPaper(fileName)
            .then(({ data }) => {
                this.setState({ loading: false })
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Research Paper Downloaded",
                    icon: "success",
                    button: "Ok",
                })
            });
    }

    formChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log('form changed'));

    };

    submitBtnClicked(email) {
        return this.props.submitBtnClicked(email)
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
        if (this.state.currentPage < Math.ceil(this.state.papers.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.papers.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.papers.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.refreshPapers());

    };

    render() {

        const { currentPage, entriesPerPage, papers, search } = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = papers.slice(firstIndex, lastIndex);
        const totalPages = papers.length / entriesPerPage;

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
                                <FontAwesomeIcon icon={faFilePdf} />&nbsp; Research Papers
                            </div>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                                </InputGroup>
                            </div>
                        </Card.Header>

                        <Card.Body style={{ backgroundColor: "white" }}>
                            <Table hover style={{ backgroundColor: "white" }} variant="">
                                <tbody>

                                    {this.state.papers.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :

                                        currentEntries.map((paper) => (
                                            <tr key={paper.email}>
                                                <td style={{ padding: "30px" }}>
                                                    <h5>{paper.title}</h5>
                                                    <p style={{ margin: "5px 0px" }}>By: {paper.author}</p>
                                                    <p style={{ margin: "5px 0px" }}>
                                                        {paper.status === "pending" && <Badge variant="warning">{paper.status}</Badge>}
                                                        {paper.status === "approved" && <Badge variant="success">{paper.status}</Badge>}
                                                        {paper.status === "rejected" && <Badge variant="danger">{paper.status}</Badge>}
                                                    </p>
                                                </td>
                                                <td style={{ width: "15%", textAlign: "center", padding: "55px 10px" }}>
                                                    <Form autoComplete="off" >
                                                        <Button onClick={() => this.submitBtnClicked(paper.email)} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEye} />&nbsp; View</Button>
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
            </div>
        );
    }
}

export default ReviewPapers;