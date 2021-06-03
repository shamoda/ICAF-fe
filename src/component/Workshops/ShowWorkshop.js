import React, { Component } from 'react';
import p3 from '../../asset/p3.jpg'
import { Container, Row, Col, Card } from 'react-bootstrap'
class ShowWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container>
                <Card style={{ marginLeft: "-50px", width: "1100px", marginTop: "80px", height: "550px" }}>
                    <Row>
                        <Col >

                            <img src={p3} style={{ width: "400px", marginTop: "60px", marginLeft: "40px" }} />

                        </Col>
                        <Col style={{ marginLeft: "30px", marginTop: "150px" }}>
                            <h1>Hello</h1>
                            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            ssfs
                            sfsfffffffffffffffff
                            sfssssssssssssssssssssssssssss
                            sfffffffffffffffffffffffffff
                        </p>

                        </Col>
                    </Row>

                </Card>

            </Container >
        );
    }
}

export default ShowWorkshop;