//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js'

//Hoc components
import Auth from '../hoc/auth.js';

//Navigation component
import {Switch, Route} from 'react-router-dom';
import Home from './home/home.js';
import News from './news/news.js';
import Members from './members/members.js';
import Pages from './pages/pages.js';
import Login from '../components/login/login.js';

//----------Core Code-------//
const Index = (props) => {
    
    return(
    <div>
        <Navbar/>
        <Switch>
            <Route exact path="/admin" component={Auth(Home, true)}/>
            <Route exact path="/admin/news" component={Auth(News, true)} />
            <Route exact path="/admin/pages" component={Auth(Pages, true)} />
            <Route exact path="/admin/members" component={Auth(Members, true)} />
            <Route exact path="/admin/login" component={Auth(Login, false)} />
        </Switch>
    </div>)
}

export default Index;

