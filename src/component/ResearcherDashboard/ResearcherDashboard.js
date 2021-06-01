import React, { Component } from 'react';
import ResearcherDashboardDataService from './ResearcherDashboardDataService'
import './ResearcherDashboard.css'
import { Button, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faCross, faDownload, faSignInAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PayPalButton } from "react-paypal-button-v2";

class ResearcherDashboard extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            contact: '',
            title: '',
            author: '',
            paperAbstract: '',
            fileName: '',
            status: '',
            paid: '',
            rComment: '',
            loading: false,
            isPending: false,
            isApproved: false,
            isRejected: false,
            paymentPending: false,
            published: false
         }

        this.refreshResearcher = this.refreshResearcher.bind(this);
        this.downloadPaperTemplateClicked = this.downloadPaperTemplateClicked.bind(this);
        this.updatePaymentStatus = this.updatePaymentStatus.bind(this);
        this.getStatus = this.getStatus.bind(this);
    }

    refreshResearcher() {
        ResearcherDashboardDataService.getResearcher(sessionStorage.getItem('authenticatedUserEmail'))
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    contact: res.data.contact,
                    title: res.data.title,
                    author: res.data.author,
                    paperAbstract: res.data.paperAbstract,
                    fileName: res.data.fileName,
                    status: res.data.status,
                    paid: res.data.paid,
                    rComment: res.data.rcomment
                }, () => {this.getStatus()})
            })
    }

    updatePaymentStatus() {
        ResearcherDashboardDataService.updatePayment(sessionStorage.getItem('authenticatedUserEmail'))
            .then(res => {
                this.refreshResearcher()
            })
    }

    getStatus() {
        if(this.state.status == 'pending') {
            this.setState({isPending: true})
        } else if(this.state.status == 'approved') {
            this.setState({isApproved: true})
        } else if(this.state.status == 'rejected') {
            this.setState({isRejected: true})
        } 
        if(this.state.paid == 'false' && this.state.status == 'approved') {
            this.setState({paymentPending: true})
        } 
        if(this.state.paid == 'true' && this.state.status == 'approved') {
            this.setState({published: true})
        }
    }

    componentDidMount() {
        this.refreshResearcher()
    }

    downloadPaperTemplateClicked() {
        this.setState({loading: true})
        ResearcherDashboardDataService.downloadPaper(this.state.fileName)
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

    render() { 
        return ( 
            <div>
                <div className="researcherdashboard-title">
                    RESEARCHER PROFILE
                </div>

                <Container style={{marginTop: "85px", marginBottom: "85px"}}>
                    <h2>{this.state.title}</h2>
                    <h4>Author(s): {this.state.author}</h4>
                    <p style={{marginBottom: "5px"}}>{this.state.paperAbstract}</p>

                    <Button style={{background: "transparent", color: "blue", border: "none", marginBottom: "20px", fontWeight: "600", padding: "0px"}} onClick={this.downloadPaperTemplateClicked}><FontAwesomeIcon size="sm" icon={faDownload} />&nbsp; Download</Button>
                    {this.state.isPending && <h5 style={{color: "#FE4E02"}}><FontAwesomeIcon className="fa-sm" icon={faClock} />&nbsp; Pending</h5>}
                    {this.state.isApproved && <h5 style={{color: "green"}}><FontAwesomeIcon className="fa-sm" icon={faCheckCircle} />&nbsp; Approved</h5>}
                    {this.state.isRejected && <h5 style={{color: "red"}}><FontAwesomeIcon className="fa-sm" icon={faTimesCircle} />&nbsp; Rejected</h5>}
                    {this.state.published && <h5 style={{color: "green"}}><FontAwesomeIcon className="fa-sm" icon={faCheckCircle} />&nbsp; Congradulations! Your paper is now visible for everyone.</h5>}
                    {!this.state.isPending && <p><b>Reviewer comment:</b> {this.state.rComment}</p>}
                    {this.state.paymentPending && <p style={{marginBottom: "0px", marginTop: "20px"}}><b>Please complete your research paper submission by making the necessary payment</b></p>}
                    {this.state.paymentPending && <p>Submission fee: $10</p>}
                    {this.state.paymentPending && <div className="attendeeregistration-paypal">
                        <PayPalButton
                            style={{layout: "horizontal", color: "gold", height: 40, tagline: "true", label: "pay"}}
                            amount="10.00"
                            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details) => {
                                this.setState({paymentPending: !this.state.paymentPending})
                                this.setState({published: !this.state.published})
                                this.updatePaymentStatus()

                            }}
                        />
                    </div>}
                    {/* {this.state.published && <h5 style={{color: "green"}}><FontAwesomeIcon className="fa-sm" icon={faCheckCircle} />&nbsp; Congradulations! Your paper is now visible for everyone.</h5>} */}


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
 
export default ResearcherDashboard;