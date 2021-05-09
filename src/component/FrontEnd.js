import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header-Footer/Header';

class FrontEnd extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Router>
                    <Header/>
                        <Switch>
                            
                        </Switch>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;