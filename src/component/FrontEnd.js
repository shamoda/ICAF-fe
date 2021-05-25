import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AttendeeRegistration from './AttendeeRegistration/AttendeeRegistration';
import CommitteeRegistration from './CommitteeRegistration/CommitteeRegistration';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import ImportantDates from './ImportantDates/ImportantDates';
import KeyNotes from './KeyNotes/KeyNotes';
import Login from './Login/Login';
import PaperRegistration from './PaperRegistration/PaperRegistration';
import Papers from './Papers/Papers';
import Program from './Program/Program';
import Downloads from './TemplatesDownloads/Downloads';
import Workshops from './Workshops/Workshops';

class FrontEnd extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Router>
                    <Header/>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/keynotes" component={KeyNotes}/>
                            <Route path="/papers" component={Papers}/>
                            {/* <Route path="/presentations" component={Presentations}/> */}
                            <Route path="/workshops" component={Workshops}/>
                            <Route path="/importantdates" component={ImportantDates}/>
                            <Route path="/downloads" component={Downloads}/>
                            <Route path="/program" component={Program}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/paperregistration" component={PaperRegistration}/>
                            <Route path="/attendeeregistration" component={AttendeeRegistration}/>
                            <Route path="/committeeregistration" component={CommitteeRegistration}/>
                        </Switch>
                    <Footer/>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;