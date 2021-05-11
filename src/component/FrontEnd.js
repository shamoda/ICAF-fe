import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header-Footer/Header';
import Home from './Home/Home';

class FrontEnd extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Router>
                    <Header/>
                        <Switch>
                            <Route path="/" exact component={Home} />
                        </Switch>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;