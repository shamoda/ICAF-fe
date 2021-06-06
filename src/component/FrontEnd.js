import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AttendeeRegistration from './AttendeeRegistration/AttendeeRegistration';
import CommitteeRegistration from './CommitteeRegistration/CommitteeRegistration';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import ImportantDates from './ImportantDates/ImportantDates';
import KeyNotes from './KeyNotes/KeyNotes';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import PaperRegistration from './PaperRegistration/PaperRegistration';
import Papers from './Papers/Papers';
import Program from './Program/ResearchProgram';
import WorkshopCorousel from './Program/WorkshopCorousel';
import ResearcherDashboard from './ResearcherDashboard/ResearcherDashboard';
import ReviewerDashboard from './ReviewerDashboard/ReviewerDashboard';
import ReviewPaperDetails from './ReviewPapers/ReviewPaperDetails/ReviewPaperDetails';
import ReviewPapers from './ReviewPapers/ReviewPapers';
import Downloads from './TemplatesDownloads/Downloads';
import WorkshopConductorProfile from './WorkshopConductorProfile/WorkshopConducorProfile';
import Workshops from './Workshops/Workshops';
import WorkshopConductor from './WorkshopConductor/WorkshopConductor';
import WorkshopRegistration from './WorkshopRegistration/WorkshopRegistration';
import ReviewWorkshopDetails from './ReviewWorkshop/ReviewWorkshopDetails';
import WorkshopEditorDashBoard from './WorkshopEditor/WorkshopEditorDashBoard';
import WorkshopEditor from './WorkshopEditor/WorkshopEditor';
import WorkshopDetails from './Workshops/WorkshopDetails';
import ResearchProgram from './Program/ResearchProgram';
import WorkshopProgram from './Program/WorkshopProgram';

class FrontEnd extends Component {
    state = {}
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/keynotes" component={KeyNotes} />
                        <Route path="/papers" component={Papers} />
                        <Route path="/workshops/:id" component={WorkshopDetails} />
                        <Route path="/workshops" component={Workshops} />
                        <Route path="/conductorregistration" component={WorkshopConductor} />
                        <Route path="/workshopregistration/:id" component={WorkshopRegistration} />
                        <Route path="/importantdates" component={ImportantDates} />
                        <Route path="/downloads" component={Downloads} />
                        <Route path="/researchProgram" component={ResearchProgram} />
                        <Route path="/workshopProgram" component={WorkshopProgram} />
                        <Route path="/login" component={Login} />
                        <Route path="/paperregistration" component={PaperRegistration} />
                        <Route path="/attendeeregistration" component={AttendeeRegistration} />
                        <Route path="/committeeregistration" component={CommitteeRegistration} />
                        <Route path="/review/:email" component={ReviewPaperDetails} />
                        <Route path="/review/" component={ReviewPapers} />
                        <Route path="/reviewer" component={ReviewerDashboard} />
                        <Route path="/reviewWorkshop/:id" component={ReviewWorkshopDetails} />
                        <Route path="/researcherprofile" component={ResearcherDashboard} />
                        <Route path="/test" component={AdminDashboard} />
                        <Route path="/conductorProfile" component={WorkshopConductorProfile} />
                        {/* <Route path="/editorDashBoards/:id" component={WorkshopEditorDashBoard} /> */}
                        <Route path="/editorDashBoard" component={WorkshopEditorDashBoard} />
                        <Route path="/edit/:id" component={WorkshopEditor} />

                        <Route component={NotFoundError} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default FrontEnd;