import React, { Component } from 'react';
import { Image, Carousel, Tab, Container, Tabs } from 'react-bootstrap';
import './Home.css'
import banner from '../../asset/banner2.jpg';
import PostList from '../Program/PostList';
import PapersList from '../PapersList/PapersList';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentDidMount() {
        window.scroll(0, 0)
    }

    redirectToLogin() {
        return this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <Carousel indicators={false} nextIcon={<span style={{ display: "none" }} />} prevIcon={<span style={{ display: "none" }} />} className={"img_overlay img-hover-zoom"}>
                    <Carousel.Item interval={10}>
                        <Image src={banner} fluid />
                        <Carousel.Caption>
                            <p className="home-banner-title">ICAF 2021</p>
                            <h1>International Conference on Application Frameworks</h1>
                            <br />
                            <h3>04th 05th and 06th July 2021</h3>
                            <br />
                            <h4 className="home-banner-bottom">Sri Lanka Institute of Information Technology, Sri Lanka</h4>
                            {/* <p className="home-banner-bottom">Virtual Conference</p> */}

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Container>
                    <div className="program-topics">
                        <Tabs style={{ textAlign: "center" }} variant="tabs" defaultActiveKey="a" unmountOnExit={true} >
                            <Tab style={{ textAlign: "left" }} eventKey="a" title="Workshops">
                                <div>
                                    <PostList />
                                </div>
                            </Tab>
                            <Tab style={{ textAlign: "left" }} eventKey="b" title="Research Papers">
                                <PapersList redirectToLogin={this.redirectToLogin} />
                            </Tab>
                        </Tabs>

                    </div>
                </Container>
            </div>
        );
    }
}
export default Home;