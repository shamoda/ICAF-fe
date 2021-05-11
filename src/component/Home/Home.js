import React, { Component } from 'react';
import { Image, Carousel } from 'react-bootstrap';
import './Home.css'
import banner from '../../asset/banner1.jpg';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Carousel indicators={false} nextIcon={<span style={{display:"none"}} />} prevIcon={<span style={{display:"none"}} />} className={"img_overlay img-hover-zoom"}>
                    <Carousel.Item interval={10}>
                        <Image src={banner} fluid />
                        <Carousel.Caption>
                            <p className="home-banner-title">ICAC 2021</p>
                            <h1>International Conference on Application Frameworks</h1>
                            <br/>
                            <h3>04th 05th and 06th July 2021</h3>
                            <br/>
                            <h4>Sri Lanka Institute of Information Technology, Sri Lanka</h4>
                            <p className="home-banner-bottom">Virtual Conference</p>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}
 
export default Home;