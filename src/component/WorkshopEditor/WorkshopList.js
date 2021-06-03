import React, { Component } from 'react';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import Carousel from '../WorkshopCarousel/Carousel';
import './WorkshopEditor.css'

import WorkshopEditorDataservide from './WorkshopEditorDataservice'
class WorkshopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            search: '',
            loading: false,
            currentPage: 1,
            entriesPerPage: 5,
        }
        this.getProposal = this.getProposal.bind(this)
    }

    componentDidMount() {
        this.getProposal()
    }

    getProposal() {
        this.setState({ loading: true })
        let example = {
            workshopTitle: this.state.search,
            status: "pending",
            workshopDescription: this.state.search
        }
        WorkshopEditorDataservide.getProposals(example)
            .then((res) => {
                this.setState({
                    proposals: res.data
                })
                this.setState({ loading: false })
            })
        console.log(this.state.proposals)
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
                    EDITORS PORTAL
                </div>
                <Row>
                    <Col>
                        <Carousel proposals={this.state.proposals} />
                    </Col>
                    <Col>
                        <div className="workshopeditor-div">
                            {currentEntries.map((p) => (
                                <div key={p.workshopID} onClick={() => this.props.history.push(`/workshopEditor/${p.workshopID}`)}>
                                    <Card className="workshopeditor-card" body >
                                        <Row>
                                            <Col>
                                                <Button style={{ fontSize: 10 }} variant="dark">{p.workshopID}</Button>
                                            </Col>
                                            <Col xs={8}>
                                                <h6>{p.workshopTitle}</h6>
                                            </Col>
                                        </Row>
                                    </Card>


                                </div>
                            ))}
                            <Card.Footer style={{ backgroundColor: "white", color: "black", marginRight: 100, marginmBottom: 100 }}>
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
                        </div>

                    </Col>
                </Row>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}
export default WorkshopList;