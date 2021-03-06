//---------Declaration-----------//
import React from 'react';
import Navbar from '../components/navbar/navbar.js';

//Navigation component
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard/dashboard.js';
import News from './news/news.js';
import Members from './members/members.js';
import Pages from './pages/pages.js';
import Resources from './resources/resources.js';
import Administrator from './administrator/administrator.js';

const Index = (props) => {

    return <div className="fill-height">
        <Navbar history={props.history} />
        <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/admin/news" component={News} />
            <Route exact path="/admin/administrator" component={() => <Administrator user={props.user} />} />
            <Route exact path="/admin/pages" component={Pages} />
            <Route exact path="/admin/members" component={Members} />
            <Route exact path="/admin/resources" component={Resources} />
            <Route path="/">
                <Redirect to="/admin" />
            </Route>
        </Switch>
    </div>
}

export default Index;
