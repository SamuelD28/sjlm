//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import Headbar from '../components/headbar/headbar.js';

//Navigation component
import {Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home.js';
import News from './news/news.js';
import Members from './members/members.js';
import Pages from './pages/pages.js';
import Mails from './mails/mails.js';
import Administrator from './administrator/administrator.js';
import Menus from './menus/menus.js';

//----------Core Code-------//
//Could add authentification here as well for better security. To review
const Index = (props) => {
    return(
    <div>
        <Navbar/>
        <Headbar user={props.user}/>
        <Switch>
            <Route exact path="/admin" component={Home} something="foo"/>
            <Route exact path="/admin/news" component={News} />
            <Route exact path="/admin/pages" component={Pages} />
            <Route exact path="/admin/members" component={Members} />
            <Route exact path="/admin/mails" component={Mails} />
            <Route path="/">
                <Redirect to="/admin" />
            </Route>
        </Switch>
    </div>)
}
// <Route exact path="/admin/menus" component={Menus} />
// <Route exact path="/admin/administrator" render={()=><Administrator user={props.user}/>}/>

export default Index;

