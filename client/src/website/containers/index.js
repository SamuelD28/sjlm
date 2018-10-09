//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js'
//Navigation component
import {Switch, Route} from 'react-router-dom';
import Home from './home/home.js';
import StaticPage from './staticPage/staticPage.js';

//----------Core Code-------//
const Index = (props) =>{
    return(
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/static/:id" component={StaticPage} />
        </Switch>
    </div>
    )
}

export default Index;