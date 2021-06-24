import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import notfound from '../../asset/notfound.png'
class EditorWorkshopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: {
                title: '',
                subject: '',
                description: '',
                conductor: '',
                date: '',
                venue: '',
                workshopId: '',
                status: ''
            }
        }
    }

    shiftoEdit = (id) => {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        const { workshop } = this.props
        return (
            <div>
                <Card border="dark" style={{ width: '500px', height: '500px', marginBottom: '30px', marginTop: '20px', marginLeft: '200px' }}>
                    <Card.Header>ICAF 2021 WORKSHOP CORNER</Card.Header>
                    {!workshop.workshopId ?
                        <div>
                            <img style={{ height: '400px' }} src={notfound} />
                            <Button style={{ fontSize: 15, marginLeft: '80px' }} variant="danger"><h5>Please Select a Workshop !!</h5></Button>
                        </div>
                        :
                        <Card.Body>
                            <Card.Title>  <Button style={{ fontSize: 10 }} variant="dark">{workshop.workshopId}</Button></Card.Title>
                            <div style={{ marginTop: '-40px', marginLeft: '350px' }}>
                                <Button style={{ fontSize: 15 }} variant="danger">{workshop.status}</Button>
                            </div>
                            <Card.Text style={{ marginTop: '20px' }}>
                                <h5 style={{ marginTop: '20px' }}>{workshop.title}</h5>
                                <h6 style={{ marginTop: '20px' }}>{workshop.subject}</h6>
                                <div>
                                    {workshop.description}
                                </div>
                                <h6 style={{ marginTop: '40px' }}>xxx</h6>
                            </Card.Text>
                            <Button style={{ fontSize: 10 }} variant="dark" onClick={() => this.shiftoEdit(workshop.workshopId)}>EDIT</Button>
                        </Card.Body>//
                    }
                </Card>
            </div >
        );
    }
}
export default withRouter(EditorWorkshopList);