import React, { Component } from 'react';
import { Carousel, Card, CardGroup } from 'react-bootstrap';
import lion from '../../asset/lion.jpg';
import girl from '../../asset/girl.jpg';
import ch from '../../asset/ch.jpg';
class WorkshopCorousel extends Component {
    state = {}
    render() {
        return (

            <Carousel fade >
                <Carousel.Item style={{ width: '1200px', maxHeight: '400px' }}>
                    <img
                        className="d-block w-100"
                        src={lion}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ width: '1200px', maxHeight: '400px' }}>
                    <img
                        className="d-block w-100"
                        src={lion}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ width: '1200px', maxHeight: '400px' }}>
                    <img
                        className="d-block w-100"
                        src={lion}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}
export default WorkshopCorousel;