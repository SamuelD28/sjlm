//---------Declaration-----------//
import React, {Component} from 'react';
import Navbar from '../components/navbar/navbar.js'
import {Ajax} from '../../shared/utility.js';

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
        this.ReadRequest("/api/pages", "pages");
        this.ReadRequest("/api/news/limit/3", "news");
    }
    
    //Method that render the navbar only when the ajax request are finished
    RenderNavbar = () =>
    {
        if(this.state.pages !== undefined)
            return(<Navbar pages={this.state.pages} navbarLite={true}/>);
    }
    
    render(){
    return(
    <div> 
        {this.RenderNavbar()}
        <Switch>
            <Route exact path="/" component={() => {return(<Home news={this.state.news} />)}} />
            <Route exact path="/static/:id" component={StaticPage} />
            <Route exact path="/news/:id" component={NewsPage} />
            <Route exact path="/category/:category" component={NewsCategory} />
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