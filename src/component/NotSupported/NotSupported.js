import React, { Component } from 'react';
import "./NotSupported.css"

class NotSupported extends Component {
  render() { 
    return ( 
      <div className="NotSupported-main">
        <div className="NotSupported-title">Sorry !!!</div>
        <div className="NotSupported-sub">Your screen resolution is not supported for this application</div>
        <div>Contact <a href="mailto:icaf2021@gmail.com" className="NotSupported-contact">icaf2021@gmail.com</a> for more info</div>
      </div>
     );
  }
}
 
export default NotSupported;