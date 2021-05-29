import React, { Component } from 'react';
import { Container, Tab, Tabs, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faFileDownload, faFilePdf, faFilePowerpoint, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import ReviewPaperDetails from '../ReviewPapers/ReviewPaperDetails/ReviewPaperDetails';
import ReviewPapers from '../ReviewPapers/ReviewPapers';

class ReviewerDashboard extends Component {
    
    submitBtnClicked = (email) => {
        return this.props.history.push('/review/'+email);
    }

    render() {
        return ( 
            <div>
                <div className="attendeeregistration-title">
                    Reviewer Portal
                </div>

                <div>
                    <Container>
                    <div className="program-topics">
                            <Tabs style={{textAlign: "center"}} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                <Tab style={{textAlign: "left"}} eventKey="a" title="Papers">
                                    <ReviewPapers submitBtnClicked={this.submitBtnClicked} />
                                </Tab>
                                <Tab style={{textAlign: "left"}} eventKey="b" title="Workshops">
                                    Workshop List comes here
                                </Tab>
                            </Tabs>

                        </div>
                    </Container>
                </div>
            </div>
         );
    }
}
 
export default ReviewerDashboard;