import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEdit, faEye, faFastBackward, faFastForward, faFilePdf, faSave, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import './ReviewPapers.css'
import ReviewPapersDataService from './ReviewPapersDataService';

class ReviewPapers extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            papers:[],
            rComment: '',
            status: '',

            currentPage : 1,
            entriesPerPage : 5,
            search: '',
            searchMessage:null,
            loading: false
        }

        this.refreshPapers = this.refreshPapers.bind(this);
        this.submitBtnClicked = this.submitBtnClicked.bind(this);
    }

    refreshPapers() {
        let example = {
            title: this.state.search,
            status: 'pending'
        }
        ReviewPapersDataService.getResearchPapers(example)
            .then(response => {
                this.setState({papers: response.data})
            })
    }

    componentDidMount() {
        this.refreshPapers()
    }

    downloadPaperTemplateClicked(fileName) {
        this.setState({loading: true})
        ReviewPapersDataService.downloadPaper(fileName)
            .then(({ data }) => {
                this.setState({loading: false})
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

    formChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => console.log('form changed'));
        
    };

    submitBtnClicked(email) {
        return this.props.submitBtnClicked(email)
    }

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.papers.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage : Math.ceil(this.state.papers.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.papers.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage : this.state.currentPage + 1
            });
        }
    };

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => this.refreshPapers());
        
    };




    render() { 

        const { currentPage, entriesPerPage, papers, search} = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = papers.slice(firstIndex, lastIndex);
        const totalPages = papers.length / entriesPerPage;

        const pageNumCss = {
            width : "45px",
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
                {/* <div className="attendeeregistration-title">
                    Pending Papers
                </div> */}

                <Container className="paperlist-container">
                    <Card className={""} style={{backgroundColor: "white"}}>
                        <Card.Header style={{backgroundColor: "white"}}>
                            <div style={{float:"left", fontSize: "20px", fontWeight: "600"}}>
                            <FontAwesomeIcon icon={faFilePdf} />&nbsp; Research Papers
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <FontAwesomeIcon style={{marginTop: "8px"}} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className=""  />&nbsp;
                                </InputGroup>
                            </div>
                        </Card.Header>

                        <Card.Body style={{backgroundColor: "white"}}>
                            <Table hover style={{backgroundColor: "white"}} variant="">
                                <tbody>

                                    {this.state.papers.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :

                                    currentEntries.map((paper) => ( 
                                    <tr key={paper.email}>
                                    <td style={{padding:"30px"}}>
                                        <h5>{paper.title}</h5>
                                        <p style={{margin: "5px 0px"}}>By: {paper.author}</p>
                                        {/* <p style={{margin: "0px"}}>{paper.paperAbstract}</p>
                                        <br/>
                                        <Row>
                                            <Col>Name: {paper.name}</Col>
                                            <Col>Email: {paper.email}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Contact: {paper.contact}</Col>
                                        </Row>
                                        <Button style={{background: "transparent", color: "blue", border: "none", margin: "0px", padding: "0px"}} onClick={() => this.downloadPaperTemplateClicked(paper.fileName)}><FontAwesomeIcon size="sm" icon={faDownload} />&nbsp; {paper.fileName}</Button> */}
                                    </td>
                                    <td style={{width: "15%", textAlign: "center", padding:"40px 10px"}}>
                                        <Form autoComplete="off" >
                                                {/* <Form.Control
                                                    as="select"
                                                    className="my-1 mr-sm-2"
                                                    custom
                                                    onChange={this.formChange}
                                                    name="status"
                                                    value={this.state.status}
                                                    required
                                                >
                                                    <option value="">Choose...</option>
                                                    <option value="approved">Approve</option>
                                                    <option value="rejected">Reject</option>
                                                </Form.Control>
                                                <Form.Group>
                                                    <Form.Control onChange={this.formChange} name="rComment" value={this.state.rComment} maxLength="100"  as="textarea" rows={3} placeholder="your comment" required />
                                                </Form.Group> */}
                                            <Button onClick={() => this.submitBtnClicked(paper.email)} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEye} />&nbsp; View</Button>
                                        </Form>
                                    </td>
                                    </tr>)) 
                                    }
                                    
                                </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer style={{backgroundColor: "white", color: "black"}}>
                            <div style={{float:"left"}}>
                                Showing Page {currentPage} of {Math.ceil(totalPages)}
                            </div>
                            <div style={{float:"right"}}>
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