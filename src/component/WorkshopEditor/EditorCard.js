import React, { Component } from 'react';
import { Button, Row, Col, Card, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastBackward, faFastForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

import './WorkshopEditor.css'
class EditorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const { currentEntries, totalPages, pageNumCss, currentPage, nextPage, prevPage, lastPage, firstPage, getProposalById } = this.props
        return (
            <div className='workshopeditor-div'>
                {currentEntries.map((p) => (
                    <Card className="workshopeditor-card" style={{ minWidth: '500px', cursor: 'pointer' }} body key={p.workshopId} onClick={() => getProposalById(p.workshopId)}>
                        <Row>
                            <Col>
                                <Button style={{ fontSize: 10 }} variant="dark" >{p.workshopId}</Button>
                            </Col>
                            <Col xs={7}>

                                <h6>{p.title}</h6>
                            </Col>
                            <Col>
                                {p.publish === "pending" && <Badge variant="warning">{p.publish}</Badge>}
                                {p.publish === "published" && <Badge variant="success">{p.publish}</Badge>}
                                {p.publish === "unpublished" && <Badge variant="danger">{p.publish}</Badge>}
                            </Col>
                        </Row>
                    </Card>
                ))
                }
                <Card.Footer style={{ backgroundColor: "white", color: "black", marginRight: 100, marginmBottom: 100, minWidth: '500px' }}>
                    <div style={{ float: "left" }}>
                        Showing Page {currentPage} of {Math.ceil(totalPages)}
                    </div>
                    <div style={{ float: "right" }}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={firstPage}>
                                    <FontAwesomeIcon icon={faFastBackward} /> First
                                </Button>
                                <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={prevPage}>
                                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl style={pageNumCss} className="" name="currentPage" value={currentPage} disabled />
                            <InputGroup.Append>
                                <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={nextPage}>
                                    Next <FontAwesomeIcon icon={faStepForward} />
                                </Button>
                                <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={lastPage}>
                                    Last <FontAwesomeIcon icon={faFastForward} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Footer>

            </div >
        );
    }
}
export default EditorCard;