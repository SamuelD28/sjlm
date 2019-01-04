//---------Declaration-----------//
import React, {Component} from 'react';
import Navbar from '../components/navbar/navbar.js'
import Ajax from '../../shared/ajax.js';

//Navigation component
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './home/home.js';
import StaticPage from './staticPage/staticPage.js';
import NewsPage from './newsPage/newsPage.js';
import NewsCategory from './newsCategory/newsCategory.js';

//----------Core Code-------//
class Index extends Component{

    constructor(props)
    {
        super(props);
        this.state = {};
    }

    ReadRequest = async(url, name) =>
    {
        let request  = await Ajax.GetData(url);
        let stateObject = {};
        stateObject[name.valueOf()] = request.data;
        this.setState(stateObject);
    }

    //Method that initialise the data that will be passed down to the child component
    componentDidMount = async() =>
    {
        this.ReadRequest("/api/news/limit/3", "news");
    }

    render(){
    return(
    <div>
        <Navbar navbarLite={true}/>
        <Switch>
            <Route exact path="/" component={() => {return(<Home news={this.state.news} />)}} />
            <Route exact path="/pages/static/:id" component={StaticPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route exact path="/news/category/:category" component={NewsCategory} />
            <Route exact path="/contact" component={() => {return(<h1>Contact</h1>)}} />
            <Route path="/">
                <Redirect to="/" />
            </Route>
        </Switch>
        <div id="backgroundOverlay">
        </div>
    </div>
    )
    }
}

export default Index;