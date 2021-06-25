import React, { Component } from 'react';
import { Container, Tab, Tabs, Button } from 'react-bootstrap';
import ReviewPapers from '../ReviewPapers/ReviewPapers';
import ReviewWorkshop from '../ReviewWorkshop/ReviewWorkshop'
class ReviewerDashboard extends Component {

    submitBtnClicked = (email) => {
        return this.props.history.push('/review/' + email);
    }
    //Browser Router also works

    render() {
        return (
            <div>
                <div className="attendeeregistration-title">
                    Reviewer Portal
                </div>
                <div>
                    <Container>
                        <div className="program-topics">
                            <Tabs style={{ textAlign: "center" }} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                                <Tab style={{ textAlign: "left" }} eventKey="a" title="Papers">
                                    <ReviewPapers submitBtnClicked={this.submitBtnClicked} />
                                </Tab>
                                <Tab style={{ textAlign: "left" }} eventKey="b" title="Workshops">
                                    <ReviewWorkshop workshopClicked={this.workshopClicked} />
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