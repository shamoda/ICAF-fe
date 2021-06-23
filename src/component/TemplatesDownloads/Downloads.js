import React, { Component } from 'react';
import { Container, Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './Downloads.css'
import DownloadsDataService from './DownloadsDataService';

class Downloads extends Component {
    
    constructor(props){
        super(props);
        this.state = { loading: false }

        this.downloadPaperTemplateClicked = this.downloadPaperTemplateClicked.bind(this);
        this.downloadPresentationTemplateClicked = this.downloadPresentationTemplateClicked.bind(this);
        this.downloadProposalTemplateClicked = this.downloadProposalTemplateClicked.bind(this);
    }

    downloadPaperTemplateClicked() {
        this.setState({loading: true})
        DownloadsDataService.downloadPaper()
            .then(({ data }) => {
                this.setState({loading: false})
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-research-paper-template.docx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Research Paper Template Downloaded",
                    icon: "success",
                    button: "Ok",
                  })
            });
    }

    downloadPresentationTemplateClicked() {
        this.setState({loading: true})
        DownloadsDataService.downloadPresentation()
            .then(({ data }) => {
                this.setState({loading: false})
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-presentation-template.pptx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Presentation Template Downloaded",
                    icon: "success",
                    button: "Ok",
                  })
            });
    }

    downloadProposalTemplateClicked() {
        this.setState({loading: true})
        DownloadsDataService.downloadProposal()
            .then(({ data }) => {
                this.setState({loading: false})
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'icaf-workshop-proposal-template.docx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                swal({
                    title: "Workshop Proposal Template Downloaded",
                    icon: "success",
                    button: "Ok",
                  })
            });
    }

    render() { 
        return ( 
            <div>
                <div className="downloads-title">
                    DOWNLOADS
                </div>

                <Container className="downloads-container">
                    <div className="downloads-topics">
                        <Button onClick={this.downloadPaperTemplateClicked} variant="dark" className="downloads-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileDownload } />&nbsp; Research Paper Template</Button><br/>
                        <Button onClick={this.downloadProposalTemplateClicked} variant="dark" className="downloads-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileDownload } />&nbsp; Workshop Proposal Template</Button><br/>
                        <Button onClick={this.downloadPresentationTemplateClicked} variant="dark" className="downloads-button"><FontAwesomeIcon style={{float:"right", marginTop:"3px"}} icon={ faFileDownload } />&nbsp; Presentation Template</Button>
                    </div>
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
 
export default Downloads;