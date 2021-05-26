import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFastBackward, faFastForward, faFilePdf, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import './PapersList.css'
import PapersListDataService from './PapersListDataService';

class PapersList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            papers:[],

            currentPage : 1,
            entriesPerPage : 5,
            search: null,
            searchMessage:null,
            loading: false
        }

        this.refreshPapers = this.refreshPapers.bind(this);
    }

    refreshPapers() {
        let example = {
            title: this.state.search,
            approved: false,
            paid: false
        }
        PapersListDataService.getResearchPapers(example)
            .then(response => {
                this.setState({papers: response.data})
            })
    }

    componentDidMount() {
        this.refreshPapers()
    }

    downloadPaperTemplateClicked(fileName) {
        this.setState({loading: true})
        PapersListDataService.downloadPaper(fileName)
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
            color: "#ffff",
            textAlign: "center",
            fontWeight: "bold"
        }

        const searchBox = {
            width: "250px"
        }

        return ( 
            <div>
                <Container className="paperlist-container">
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <div style={{float:"left", fontSize: "20px", fontWeight: "600"}}>
                            <FontAwesomeIcon icon={faFilePdf} />&nbsp; Research Papers
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="bg-dark text-white"  />&nbsp;
                                </InputGroup>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <tbody>

                                    {this.state.papers.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :

                                    currentEntries.map((paper) => ( 
                                    <tr key={paper.email}>
                                    <td style={{padding:"30px"}}>
                                        <h5>{paper.title}</h5>
                                        <p style={{margin: "5px 0px"}}>By: {paper.author}</p>
                                        <p style={{margin: "0px"}}>{paper.paperAbstract.slice(0, 270)}...</p>
                                    </td>
                                    <td style={{width: "15%", textAlign: "center", padding:"75px 0px"}}><Button onClick={() => this.downloadPaperTemplateClicked(paper.fileName)} variant="outline-light"><FontAwesomeIcon icon={faDownload} />&nbsp; Download</Button></td>
                                    </tr>)) 
                                    }
                                    
                                </tbody>
                            </Table>
                        </Card.Body>

                        <Card.Footer>
                            <div style={{float:"left"}}>
                                Showing Page {currentPage} of {Math.ceil(totalPages)}
                            </div>
                            <div style={{float:"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-light" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-light" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className="bg-dark" name="currentPage" value={currentPage} disabled />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-light" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                            Next <FontAwesomeIcon icon={faStepForward} />
                                        </Button>
                                        <Button type="button" variant="outline-light" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
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
 
export default PapersList;