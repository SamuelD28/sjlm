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
    
    componentDidMount = async() =>
    {
        let news  = await Ajax.GetData("api/news");
        let pages = await Ajax.GetData("api/pages");  
        this.setState({news, pages});
    }
    
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