//---------Declaration-----------//
import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar.js'

//Navigation component
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home.js';
import StaticPage from './staticPage/staticPage.js';
import NewsPage from './newsPage/newsPage.js';
import NewsCategory from './newsCategory/newsCategory.js';
import Council from './council/council.js';
import Contact from './contact/contact.js';


//----------Core Code-------//
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    render() {
        if (this.state.loading)
            return <LoadingScreen />
        else
            return <div>
                        <Navbar navbarLite={true}/>
                        <Route
                            render={({ location }) => (
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.pathname}
                                    classNames="fade"
                                    timeout={600}>
                                    <Switch location={location}>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/pages/static/:id" component={StaticPage} />
                                        <Route exact path="/news/:id" component={NewsPage} />
                                        <Route exact path="/news/category/:category" component={NewsCategory} />
                                        <Route exact path="/contact" component={Contact} />
                                        <Route exact path="/conseil" component={Council} />
                                        <Route path="/">
                                            <Redirect to="/" />
                                        </Route>
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                            )}
                        />
                        <div id="backgroundOverlay">
                        </div>
                    </div>
    }
}

export default Index;
