import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import AttendeeRegistration from './AttendeeRegistration/AttendeeRegistration';
import CommitteeRegistration from './CommitteeRegistration/CommitteeRegistration';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import ImportantDates from './ImportantDates/ImportantDates';
import KeyNotes from './KeyNotes/KeyNotes';
import Login from './Login/Login';
import ManageUsers from './ManageUsers/ManageUsers';
import NotFoundError from './NotFoundError/NotFoundError';
import PaperRegistration from './PaperRegistration/PaperRegistration';
import Papers from './Papers/Papers';
import PapersList from './PapersList/PapersList';
import Program from './Program/Program';
import ResearcherDashboard from './ResearcherDashboard/ResearcherDashboard';
import ReviewerDashboard from './ReviewerDashboard/ReviewerDashboard';
import ReviewPaperDetails from './ReviewPapers/ReviewPaperDetails/ReviewPaperDetails';
import ReviewPapers from './ReviewPapers/ReviewPapers';
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
                            <Route path="/review/:email" component={ReviewPaperDetails}/>
                            <Route path="/review/" component={ReviewPapers}/>
                            <Route path="/reviewer" component={ReviewerDashboard}/>
                            <Route path="/researcherprofile" component={ResearcherDashboard}/>
                            <Route path="/admin" component={AdminDashboard}/>
                            <Route path="/test" component={ReviewPapers}/>

                            <Route component={NotFoundError}/>
                        </Switch>
                    <Footer/>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;