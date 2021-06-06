import React, { Component } from 'react';
import './ManageUsers.css'
import ManageUsersDataService from './ManageUsersDataService'
import Authentication from '../../authentication/Authentication';
import { Button, Container, Table, Card, InputGroup, FormControl, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward, faTrash, faUserGraduate, faUserMd, faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { faResearchgate } from '@fortawesome/free-brands-svg-icons';

class ManageUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            entriesPerPage: 5,
            search: '',
            searchMessage: null,
            loading: false
        }
        this.refreshUsers = this.refreshUsers.bind(this);
    }

    refreshUsers() {
        let example = {
            name: this.state.search,
            role: this.props.role
        }
        ManageUsersDataService.getUsers(example)
            .then(response => {
                this.setState({ users: response.data })
            })
    }

    componentDidMount() {
        this.refreshUsers()
    }

    deleteUser(email, name) {
        swal({
            title: "You are about to delete,",
            text: name,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({ loading: true })
                if (this.props.role === "attendee") {
                    ManageUsersDataService.deleteAttendee(email)
                        .then(response => {
                            this.setState({ loading: false })
                            swal({
                                title: "User Deleted Successfully!",
                                icon: "success",
                                button: "Ok",
                            }).then(result => {
                                return this.refreshUsers()
                            })
                        })
                } else if (this.props.role === "researcher") {
                    ManageUsersDataService.deleteResearcher(email)
                        .then(response => {
                            this.setState({ loading: false })
                            swal({
                                title: "User Deleted Successfully!",
                                icon: "success",
                                button: "Ok",
                            }).then(result => {
                                return this.refreshUsers()
                            })
                        })
                } else if (this.props.role === "workshopConductor") {
                    ManageUsersDataService.deleteWorkshopConductor(email)
                        .then(response => {
                            this.setState({ loading: false })
                            swal({
                                title: "User Deleted Successfully!",
                                icon: "success",
                                button: "Ok",
                            }).then(result => {
                                return this.refreshUsers()
                            })
                        })
                } else {
                    ManageUsersDataService.deleteUser(email)
                        .then(response => {
                            this.setState({ loading: false })
                            swal({
                                title: "User Deleted Successfully!",
                                icon: "success",
                                button: "Ok",
                            }).then(result => {
                                return this.refreshUsers()
                            })
                        })
                }
            }
        })
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
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.refreshUsers());

    };

    render() {

        const { currentPage, entriesPerPage, users, search } = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / entriesPerPage;

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
                                <FontAwesomeIcon icon={faUsersCog} />&nbsp; Role of the Users: {this.props.role}
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

                                    {this.state.users.length === 0 ? <tr align="center">
                                        <td colSpan="2" >No Records Found</td>
                                    </tr> :

                                        currentEntries.map((user) => (
                                            <tr key={user.email}>
                                                <td style={{ padding: "20px" }}>
                                                    <h5>{user.name}</h5>
                                                    <p style={{ padding: "0px", margin: "0px" }}>Email: {user.email}</p>
                                                </td>
                                                <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button onClick={() => this.deleteUser(user.email, user.name)} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
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
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default ManageUsers;