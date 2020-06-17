import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './Components/App';



export default class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
             	<Switch>
                	<Route exact path="/" component={App} />
                    
            
                           
            	</Switch>
            </BrowserRouter>
        );
    }
}