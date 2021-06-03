import React, { Component } from 'react';
import next from '../../asset/next.png'
import prev from '../../asset/prev.png'
import Card from './Card';
import './Carousel.css'

class Carousel extends Component {
    constructor(props) {
        super(props);
    }

    myRef = React.createRef();
    previousClick = () => {
        const slide = this.myRef.current;
        slide.scrollLeft -= slide.offsetWidth;
        if (slide.scrollLeft <= 0) {
            slide.scrollLeft = slide.scrollWidth;
        }
    };

    nextClick = () => {
        const slide = this.myRef.current;
        slide.scrollLeft += slide.offsetWidth;
        if (slide.scrollLeft >= (slide.scrollWidth - slide.offsetWidth)) {
            slide.scrollLeft = 0;
        }
    };

    render() {
        const { proposals } = this.props
        return (
            <div className="wrapper-carousel">
                <div className="app-carousel" ref={this.myRef} >
                    {proposals.map(p => (
                        <Card key={p.workshopID}
                            src={"https://icaf-2021-proposalss.s3.amazonaws.com/TEST123443546.jpg"}
                            title={p.workshopTitle}
                            des={p.workshopSubject}
                        />
                    ))
                    }
                </div>
                <div className="row">
                    <div className="prev">
                        <img src={prev} alt="" onClick={this.previousClick} />
                    </div>
                    <div className="next">
                        <img src={next} alt="" onClick={this.nextClick} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;

