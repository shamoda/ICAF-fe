import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import ImportantDates from './ImportantDates/ImportantDates';
import KeyNotes from './KeyNotes/KeyNotes';
import Papers from './Papers/Papers';
import Presentations from './Presentations/Presentations';
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
                            <Route path="/presentations" component={Presentations}/>
                            <Route path="/workshops" component={Workshops}/>
                            <Route path="/importantdates" component={ImportantDates}/>
                            <Route path="/downloads" component={Downloads}/>
                        </Switch>
                    <Footer/>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;