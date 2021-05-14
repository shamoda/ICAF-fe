import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './Downloads.css'

class Downloads extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="downloads-title">
                    DOWNLOADS
                </div>

                <Container className="downloads-container">
                    <div className="downloads-topics">
                        <h4>Important</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                            efficitur a orci. Integer at placerat velit.
                        </p>
                    </div>

                    <div className="downloads-topics">
                        <Button variant="dark" className="downloads-button"><FontAwesomeIcon icon={ faFileDownload } />&nbsp; Research Paper Template</Button>
                        <Button variant="dark" className="downloads-button"><FontAwesomeIcon icon={ faFileDownload } />&nbsp; Presentation Template</Button>
                        <Button variant="dark" className="downloads-button"><FontAwesomeIcon icon={ faFileDownload } />&nbsp; Workshop Proposal Template</Button>
                    </div>
                </Container>
            </div>
         );
    }
}
 
export default Downloads;