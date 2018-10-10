//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js'
//Navigation component
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './home/home.js';
import StaticPage from './staticPage/staticPage.js';
import NewsPage from './newsPage/newsPage.js';

//----------Core Code-------//
const Index = (props) =>{
    return(
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/static/:id" component={StaticPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route path="/" >
                <Redirect to="/" />
            </Route>
        </Switch>
    </div>
    )
}

export default Index;