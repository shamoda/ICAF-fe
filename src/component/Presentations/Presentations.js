import React, { Component } from 'react';
import { Col, Container, Row, ListGroup, Button } from 'react-bootstrap';
import './Presentations.css'

class Presentations extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="presentations-title">
                    CALL FOR PRESENTATIONS
                </div>

                <Container className="presentations-container">
                    <div className="presentations-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                        lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                        Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                        efficitur a orci. Integer at placerat velit. Nunc vehicula tristique elit sed suscipit. Mauris varius 
                        odio ut lacus interdum, ac mollis elit lobortis. Maecenas fermentum blandit odio nec interdum. Nunc 
                        efficitur diam nulla, hendrerit egestas augue dapibus eu. Donec vitae iaculis neque. Proin fermentum 
                        lectus purus, eget auctor mi gravida ut. Vivamus pellentesque est at ante tempor, sit amet sollicitudin 
                        orci mollis.
                    </div>

                    <div className="presentations-topics">
                        <h4>Submissions</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit est, posuere non libero ac, 
                            lobortis pharetra lorem. Donec volutpat mi eu tortor elementum, vitae placerat libero pulvinar. 
                            Aliquam rhoncus lectus nec mauris sagittis semper. Maecenas justo leo, interdum vel viverra at, 
                            efficitur a orci. Integer at placerat velit.
                        </p>
                    </div>

                    <div className="presentations-topics">
                        <h4>Important</h4>
                        <ul>
                            replace this list with a paragraph if want
                            <li><b>Lorem:</b> ipsum dolor sit amet</li>
                            <li><b>Lorem:</b> ipsum dolor sit amet</li>
                            <li><b>Lorem:</b> ipsum dolor sit amet</li>
                            <li><b>Lorem:</b> ipsum dolor sit amet</li>
                        </ul>
                    </div>

                    <div className="presentations-topics">
                        <Button variant="dark" className="workshops-button">Download Template</Button>
                        <Button variant="dark" className="workshops-button">Submit My Presentation</Button>
                    </div>
                    
                </Container>

            </div>
         );
    }
}
 
export default Presentations;