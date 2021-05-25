import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

class Header extends Component {

    constructor(props){
        super(props);
        this.state = { }

        this.papers = this.papers.bind(this)
        this.presentations = this.presentations.bind(this)
        this.workshops = this.workshops.bind(this)
        this.importantDates = this.importantDates.bind(this)
        this.program = this.program.bind(this)
        this.registrations = this.registrations.bind(this)
        this.downloads = this.downloads.bind(this)

    }

    papers() {
        return this.props.history.push('/papers')
    }

    presentations() {
        return this.props.history.push('/presentations')
    }

    workshops() {
        return this.props.history.push('/workshops')
    }

    importantDates() {
        return this.props.history.push('/importantdates')
    }

    program() {
        return this.props.history.push('/program')
    }

    registrations() {
        return this.props.history.push('/attendeeregistration')
    }

    downloads() {
        return this.props.history.push('/downloads')
    }

    render() {
        return ( 
            <div className="header-main">
                {/*<Navbar bg="dark" variant="dark" expand="lg">*/}
                {/*    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>*/}
                {/*    <Navbar.Collapse id="basic-navbar-nav">*/}
                        <Nav className="justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <NavLink className="nav-link header-item" to="/">Home</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link header-item" to="/keynotes">Key Notes</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                            <NavDropdown className="nav-link header-item header-dropdown" title={<span className="header-dropdown-item">For Authors</span>} id="nav-dropdown">
                                <NavDropdown.Item onClick={this.papers} eventKey="4.1">Call for Papers</NavDropdown.Item>
                                {/* <NavDropdown.Item onClick={this.presentations} eventKey="4.1">Call for Presentations</NavDropdown.Item> */}
                                <NavDropdown.Item onClick={this.workshops} eventKey="4.1">Call for Workshops</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.importantDates} eventKey="4.1">Important Dates</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.downloads} eventKey="4.1">Downloads</NavDropdown.Item>
                            </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <NavDropdown className="nav-link header-item header-dropdown" title={<span className="header-dropdown-item">For Attendees</span>} id="nav-dropdown">
                                    <NavDropdown.Item onClick={this.program} eventKey="4.1">Program</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.registrations} eventKey="4.1">Registrations</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link header-item" to="/attendeedashboard">Dashboard</NavLink>
                                {/*<NavLink className="nav-link header-item" to="/reviewerdashboard">Dashboard</NavLink>*/}
                                {/*<NavLink className="nav-link header-item" to="/editordashboard">Dashboard</NavLink>*/}
                                {/*<NavLink className="nav-link header-item" to="/admindashboard">Dashboard</NavLink>*/}
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link header-item" to="/login"><FontAwesomeIcon icon={faSignInAlt} /></NavLink>
                                {/*<NavLink className="nav-link header-item" to="/"><FontAwesomeIcon icon={faSignOutAlt} /></NavLink>*/}
                            </Nav.Item>
                        </Nav>
                {/*    </Navbar.Collapse>*/}
                {/*</Navbar>*/}
            </div>
         );
    }
}

export default withRouter(Header);