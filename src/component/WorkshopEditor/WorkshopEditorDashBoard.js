import React, { Component } from 'react';
import { Modal, Spinner, Row, Col } from 'react-bootstrap';
import EditorCard from './EditorCard';
import EditorDataService from './EditorDataService'
import EditorWorkshopList from './EditorWorkshopList';
import { withRouter } from 'react-router-dom';
import Authentication from '../../authentication/Authentication';

class WorkshopEditorDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposals: [],
            loading: false,
            currentPage: 1,
            entriesPerPage: 5,
            workshop: {
                workshopId: '',
                title: '',
                description: '',
                date: '',
                venue: '',
                status: '',
                publish: '',
                editDate: '',
                postComment: ''
            }
        }
        this.getWorkshops = this.getWorkshops.bind(this)
    }

    componentDidMount() {
        if (!Authentication.isUserLoggedIn() || !Authentication.loggedAsEditor()) {
            this.props.history.push('/notallowed');
        }
        this.getWorkshops()
        window.scrollTo(0, 0) //Scrolling to when mounting
    }

    getWorkshops() {
        let workshop = {
            status: 'approved'//test
        }
        this.setState({ loading: true })
        EditorDataService.EditWorkshop(workshop)
            .then((response) => {
                this.setState({ proposals: response.data })
                this.setState({ loading: false })
            })
    }

    getProposalById = (id) => {
        const { workshop } = this.state
        EditorDataService.getWorkshopById(id)
            .then((res) => {
                workshop["workshopId"] = res.data.workshopId
                workshop["title"] = res.data.title
                workshop["subject"] = res.data.subject
                workshop["description"] = res.data.description
                workshop["conductor"] = res.data.conductor
                workshop["date"] = res.data.date
                workshop["venue"] = res.data.venue
                workshop["status"] = res.data.status
                workshop["publish"] = res.data.publish
                workshop["editDate"] = res.data.editDate
                workshop["postComment"] = res.data.postComment
                this.setState({
                    workshop,
                })
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
        const { currentPage, entriesPerPage, proposals, search, workshop } = this.state;
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
                {/* <div className="workshops-title" >
                    EDITOR PORTAL
                  </div> */}
                <Row style={{ marginBottom: '80px', maxWidth: '90%', marginTop: '30px' }}>
                    <Col >
                        <div style={{ marginTop: '40px', marginLeft: '20px' }}>
                            <EditorCard
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
                                getProposalById={this.getProposalById}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <EditorWorkshopList workshop={workshop} />

                        </div>
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
export default withRouter(WorkshopEditorDashBoard);