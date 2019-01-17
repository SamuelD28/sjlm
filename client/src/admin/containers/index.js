//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js';
// import Headbar from '../components/headbar/headbar.js';

//Navigation component
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home.js';
import News from './news/news.js';
import Members from './members/members.js';
import Pages from './pages/pages.js';
import Mails from './mails/mails.js';
import Resources from './resources/resources.js';
import VerbalTrial from './verbalTrial/verbalTrial.js';
import Administrator from './administrator/administrator.js';

const Index = (props) => {
    return (
        <div>
        <Navbar/>
        <Switch>
            <Route exact path="/admin" component={Home} something="foo"/>
            <Route exact path="/admin/news" component={News} />
            <Route exact path="/admin/administrator" component={() => <Administrator user={props.user}/>} />
            <Route exact path="/admin/pages" component={Pages} />
            <Route exact path="/admin/members" component={Members} />
            <Route exact path="/admin/resources" component={Resources} />
            <Route exact path="/admin/mails" component={Mails} />
            <Route path="/">
                <Redirect to="/admin" />
            </Route>
        </Switch>
    </div>)
}

export default Index;
