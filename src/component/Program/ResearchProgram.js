import React, { Component } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import './Program.css'
import PapersList from '../PapersList/PapersList';

class ResearchProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    redirectToLogin() {
        return this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div className="program-title">
                    RESEARCH PROGRAM
                </div>

                <div>
                    <Container className="program-container">
                        <div className="program-description">
                            ICAF 2021 is mainly focus on 2 categories such as research papers publications and conduction of workshops.
                            Here the specialized professionals of the industry gets the opportunity to publish their research papers in our
                            ICAF research paper feed,
                            All the research paper submissions would go under a transparent selection process which is also comprised with
                            specialists of the industry.
                            The status of the submissions would be notified to the respective researcher with an email, and the approved papers
                            would be published in ICAF research paper feed.
                        </div>
                        <div className="program-topics" style={{ textAlign: "left" }}>
                            <PapersList redirectToLogin={this.redirectToLogin} />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
export default ResearchProgram;