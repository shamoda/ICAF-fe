import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import notallowed from '../../asset/notallowed.png';

class NotAllowed extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="NotFoundError-main">
                <div >
                    <Image  src={notallowed} fluid />
                </div>
                {/* <div className="NotFoundError-title">Sorry !!!</div>
                <div className="NotFoundError-sub">You are not allowed to view this page</div> */}

                <NavLink style={{textDecoration: "none"}} to="/"><FontAwesomeIcon icon={faHome} />&nbsp; Visit Home</NavLink>
            </div>
         );
    }
}
 
export default NotAllowed;