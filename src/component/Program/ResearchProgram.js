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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac,
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar.
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at,
                            efficitur a orci. Integer at placerat velit. Nunc vehicula tristique elit sed suscipit. Mauris varius
                            odio ut lacus interdum, ac mollis elit lobortis. Maecenas fermentum blandit odio nec interdum. Nunc
                            efficitur diam nulla, hendrerit egestas augue dapibus eu. Donec vitae iaculis neque. Proin fermentum
                            lectus purus, eget auctor mi gravida ut. Vivamus pellentesque est at ante tempor, sit amet sollicitudin
                            orci mollis.
                        </div>
                        <div className="program-topics" style={{textAlign:"left"}}>
                            <PapersList redirectToLogin={this.redirectToLogin} />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
export default ResearchProgram;