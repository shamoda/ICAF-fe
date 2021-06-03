import React, { Component } from 'react';
import './Carousel.css'

class Card extends Component {
    state = {}
    render() {
        const { src, title, des } = this.props
        return (

            <div className="card-carousel" >
                <img src={src} alt="" />
                <div>
                    <h5>{title}</h5>
                    <p>
                        {des}
                    </p>
                    <a href="/">Read more..</a>
                </div>
            </div>
        );
    }
}

export default Card;