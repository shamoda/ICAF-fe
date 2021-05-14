import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faFileDownload, faFilePdf, faFilePowerpoint, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './Program.css'

class Program extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="program-title">
                    PROGRAM
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

                        <div className="program-topics">
                            <Button variant="dark" className="program-button"><FontAwesomeIcon icon={ faFilePdf } />&nbsp; Research Papers</Button>
                            <Button variant="dark" className="program-button"><FontAwesomeIcon icon={ faFilePowerpoint } />&nbsp; Presentations</Button>
                            <Button variant="dark" className="program-button"><FontAwesomeIcon icon={ faCogs } />&nbsp; Workshops</Button>
                        </div>
                    </Container>
                </div>
            </div>
         );
    }
}
 
export default Program;