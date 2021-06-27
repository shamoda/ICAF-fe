import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSignInAlt, faSignOutAlt, faUserLock } from '@fortawesome/free-solid-svg-icons'
import Authentication from '../../authentication/Authentication';
import './Header.css'
import UpdateProfile from '../UpdateProfile/UpdateProfile';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false }

        this.papers = this.papers.bind(this)
        this.presentations = this.presentations.bind(this)
        this.workshops = this.workshops.bind(this)
        this.importantDates = this.importantDates.bind(this)
        this.researchProgram = this.researchProgram.bind(this)
        this.workshopProgram = this.workshopProgram.bind(this)
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

    researchProgram() {
        return this.props.history.push('/researchProgram')
    }

    workshopProgram() {
        return this.props.history.push('/workshopProgram')
    }

    registrations() {
        return this.props.history.push('/attendeeregistration')
    }

    downloads() {
        return this.props.history.push('/downloads')
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        })
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
                            <NavDropdown.Item onClick={this.researchProgram} eventKey="4.1">Research Program</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.workshopProgram} eventKey="4.1">Workshop Program</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.registrations} eventKey="4.1">Registrations</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link header-item" to="/contact">Contact</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        {Authentication.loggedAsResearcher() && <NavLink className="nav-link header-item" to="/researcherprofile">My Profile</NavLink>}
                        {Authentication.loggedAsWorkshopConductor() && <NavLink className="nav-link header-item" to="/conductorProfile">My Profile</NavLink>}
                        {/* {Authentication.loggedAsAttendee() && <NavLink className="nav-link header-item" to="/attendeeprofile">My Profile</NavLink>} */}
                        {Authentication.loggedAsReviewer() && <NavLink className="nav-link header-item" to="/reviewer">Dashboard</NavLink>}
                        {Authentication.loggedAsEditor() && <NavLink className="nav-link header-item" to="/editor">Dashboard</NavLink>}
                        {Authentication.loggedAsAdmin() && <NavLink className="nav-link header-item" to="/admin">Dashboard</NavLink>}
                    </Nav.Item>
                    <Nav.Item>
                        {Authentication.isUserLoggedIn() && <NavLink onClick={this.showModal} to="#" className="nav-link header-item"><FontAwesomeIcon icon={faUserLock} /> </NavLink>}
                    </Nav.Item>
                    <Nav.Item>
                        {!Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" to="/login"><FontAwesomeIcon icon={faSignInAlt} /></NavLink>}
                        {Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" onClick={() => Authentication.logout()} to="/"><FontAwesomeIcon icon={faSignOutAlt} /></NavLink>}
                    </Nav.Item>
                </Nav>
                <UpdateProfile show={this.state.show} onHide={this.showModal} />
                {/*    </Navbar.Collapse>*/}
                {/*</Navbar>*/}
            </div>
        );
    }
}

export default withRouter(Header);