//---------Declaration-----------//
import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar.js'

//Navigation component
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home.js';
import StaticPage from './staticPage/staticPage.js';
import NewsPage from './newsPage/newsPage.js';
import NewsTimeline from '../containers/newsTimeline/newsTimeline.js';
import NewsCategory from './newsCategory/newsCategory.js';
import Council from './council/council.js';
import Contact from './contact/contact.js';
import LoadingScreen from './loadingScreen/loadingScreen.js';
import ImportantNews from '../components/importantNews/importantNews.js';

/**
 * Routing Component used by the website section of the application.
 */
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, swipeUp: false };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ swipeUp: true });

            setTimeout(() => {
                this.setState({ loading: false });
            }, 250);

        }, 1000);
    }

    render() {
        if (this.state.loading)
            return <LoadingScreen swipeUp={this.state.swipeUp} loading={this.state.loading} />
        else
            return <div className="fill-height">
                <Navbar />
                <ImportantNews {...this.props} />
                <Route
                    render={({ location }) => (
                        <TransitionGroup className="fill-height">
                            <CSSTransition
                                key={location.pathname}
                                classNames="fade"
                                timeout={600}>
                                <Switch location={location}>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/calendrier" component={() => (<NewsTimeline calendrier={true} />)} />
                                    <Route exact path="/contact" component={Contact} />
                                    <Route exact path="/conseil" component={Council} />
                                    <Route exact path="/news/:id" component={NewsPage} />
                                    <Route exact path="/pages/static/:link" component={StaticPage} />
                                    <Route exact path="/news/category/:category" component={NewsCategory} />
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
