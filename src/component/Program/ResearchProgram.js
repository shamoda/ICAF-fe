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
                            ICAF 2021 is mainly focus on 2 categories such as research paper publications and conduction of workshops.
                            Here the specialized professionals of the industry has published their research papers in
                            ICAF-2021 research paper feed,
                            All these research papers have gone under a transparent selection process which is also comprised with
                            specialists of the industry.
                            Here the speciality is that research papers are free to download for all the registered members of ICAF-2021
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