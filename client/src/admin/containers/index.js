//---------Declaration-----------//
import React, {Component} from 'react';
import Navbar from '../components/navbar/navbar.js'
//Navigation component
import {Switch, Route} from 'react-router-dom';
import Home from './home/home.js';
import News from './news/news.js';
import Members from './members/members.js';

//----------Core Code-------//
class Index extends Component{
    render(){
    return(
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/admin" component={Home} />
            <Route exact path="/admin/news" component={News} />
            <Route exact path="/admin/members" component={Members} />
        </Switch>
    </div>
    )
    }
}

export default Index;