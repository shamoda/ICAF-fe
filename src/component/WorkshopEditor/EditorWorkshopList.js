import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, Badge } from 'react-bootstrap';
import moment from 'moment';
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
                status: '',
                publish: '',
                editDate: ''
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
                <Card border="dark" style={{ width: '500px', maxheight: '600px', marginBottom: '30px', marginTop: '20px', marginLeft: '200px' }}>
                    <Card.Header>ICAF 2021 WORKSHOP CORNER</Card.Header>
                    {!workshop.workshopId ?
                        <div>
                            <img style={{ height: '400px' }} src={notfound} />
                            <Badge style={{ fontSize: 15, marginLeft: '110px', marginBottom: '20px' }} variant="danger"><h6>Please Select a Workshop !!</h6></Badge>
                        </div>
                        :
                        <Card.Body>
                            <Card.Title>  <Button style={{ fontSize: 10 }} variant="dark">{workshop.workshopId}</Button></Card.Title>
                            <div style={{ marginTop: '-40px', marginLeft: '350px' }}>
                                {workshop.publish === "pending" && <Badge variant="warning">{workshop.publish}</Badge>}
                                {workshop.publish === "published" && <Badge variant="success">{workshop.publish}</Badge>}
                                {workshop.publish === "unpublished" && <Badge variant="danger">{workshop.publish}</Badge>}
                            </div>
                            <Card.Text style={{ marginTop: '20px' }}>
                                <h5 style={{ marginTop: '20px' }}>{workshop.title}</h5>
                                <h6 style={{ marginTop: '20px' }}>{workshop.subject}</h6>
                                <div>
                                    {workshop.description}
                                </div>

                                <div style={{ fontSize: 14 }}>
                                    Post Comment :  <Badge variant="warning">{workshop.postComment}</Badge>
                                </div>
                                <div style={{ fontSize: 12 }}>Last modified on : {moment(workshop.editDate).format("MMMM Do YYYY, h:mm:ss a")}</div>
                            </Card.Text>
                            <Button style={{ fontSize: 10, width: '100px' }} variant="dark" onClick={() => this.shiftoEdit(workshop.workshopId)}>EDIT POST</Button>
                        </Card.Body>//
                    }
                </Card>
            </div >
        );
    }
}
export default withRouter(EditorWorkshopList);