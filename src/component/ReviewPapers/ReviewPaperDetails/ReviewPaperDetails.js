import { faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Badge, Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import './ReviewPaperDetails.css'
import ReviewPaperDetailsDataService from './ReviewPaperDetailsDataService'

class ReviewPaperDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            paperAbstract: '',
            name: '',
            email: '',
            contact: '',
            status: '',
            rComment: '',
            fileName: '',
            error: null,
            loading: false,
            role: sessionStorage.getItem('authenticatedUserRole')
         }

        this.downloadPaperTemplateClicked = this.downloadPaperTemplateClicked.bind(this);
        this.submitBtnClicked = this.submitBtnClicked.bind(this);
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
    }

    componentDidMount() {
        ReviewPaperDetailsDataService.getResearchPaper(this.props.match.params.email)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    author: res.data.author,
                    paperAbstract: res.data.paperAbstract,
                    name: res.data.name,
                    email: res.data.email,
                    contact: res.data.contact,
                    status: res.data.status,
                    rComment: res.data.rcomment,
                    fileName: res.data.fileName
                }, () => console.log(this.state))
            })

        // console.log(this.state)
    }

    downloadPaperTemplateClicked() {
        this.setState({loading: true})
        ReviewPaperDetailsDataService.downloadPaper(this.state.fileName)
            .then(({ data }) => {
                this.setState({loading: false})
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', this.state.fileName);
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

    submitBtnClicked() {

        if(this.state.status == "pending" || this.state.status == "") {
            this.setState({error: true})
            return
        }
        this.setState({loading: true})
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('status', this.state.status);
        formData.append('rComment', this.state.rComment);

        ReviewPaperDetailsDataService.reviewPaper(formData)
            .then(res => {
                this.setState({loading: false})
                if (this.state.role === 'admin') {
                    return this.props.history.push('/admin');
                } else {
                    return this.props.history.push('/reviewer');
                }
            })
    }

    deleteBtnClicked() {
        swal({
            title: "You are about to delete,",
            text: this.state.title,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({loading: true})
                ReviewPaperDetailsDataService.deleteResearcher(this.state.email)
                    .then(res => {
                        this.setState({loading: false})
                        return this.props.history.push('/admin');
                })
            }
        })
    }

    formChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        }, () => console.log('form changed'));

    };

    render() {
        return (
            <div>
                <div className="attendeeregistration-title">
                    REVIEW PAPER
                </div>
                <Container style={{marginTop: "50px", marginBottom: "50px"}}>
                    <h3>{this.state.title}</h3>
                    <h4>Author(s): {this.state.author}</h4>
                    <p>{this.state.paperAbstract}</p>
                    <Button style={{background: "transparent", color: "blue", border: "none", marginBottom: "40px", padding: "0px"}} onClick={this.downloadPaperTemplateClicked}><FontAwesomeIcon size="sm" icon={faDownload} />&nbsp; Download</Button>
                    <p><b>Contact Information</b></p>
                    <Row>
                        <Col>
                            Name: {this.state.name}
                        </Col>
                        <Col>
                            Contact: {this.state.contact}
                        </Col>
                        <Col>
                            Email: {this.state.email}
                        </Col>
                    </Row>

                    <div style={{marginTop:"40px"}}>
                    <p><b>Submit Your Review</b></p>
                    <Form autoComplete="off" >
                        <Row>
                            <Col>
                                <Form.Control
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
                                <p style={{margin: "5px 0px"}}>
                                    {this.state.status === "pending" && <Badge variant="warning">{this.state.status}</Badge>}
                                    {this.state.status === "approved" && <Badge variant="success">{this.state.status}</Badge>}
                                    {this.state.status === "rejected" && <Badge variant="danger">{this.state.status}</Badge>}
                                </p>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control className="my-1 mr-sm-2" onChange={this.formChange} name="rComment" value={this.state.rComment} placeholder="your comment" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button className="my-1 mr-sm-2" onClick={this.submitBtnClicked} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                {this.state.role == "admin" ? <Button className="my-1 mr-sm-2" onClick={this.deleteBtnClicked} variant="outline-danger"><FontAwesomeIcon size="sm" icon={faTrash} /></Button> : ''}
                            </Col>
                        </Row>
                        </Form>
                    </div>
                    {this.state.error && <p style={{color: "red", fontWeight: "600", fontSize: "14px"}}>Please approve or reject research paper</p>}
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

export default ReviewPaperDetails;