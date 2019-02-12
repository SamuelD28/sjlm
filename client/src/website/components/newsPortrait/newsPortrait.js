import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './newsPortrait.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsPortrait extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

    DisplayNewsCard = () => {
        return this.props.news.map((news) => (
            <Transition
                animation="fade left"
                duration={1000}
                transitionOnMount={true}>
                <NavLink to={`/news/${news._id}`} className="component-card rounded anim-bounce-up">
                    <div styleName="newsImg" className="img-bg rounded" style={{backgroundImage : `url('${news.Images[0]}')`}}></div>
                    <div styleName="newsInfo" className="medium-gutters ">
                        <h2>{news.Title}</h2>
                        <h3>{moment(news.DateFrom).format("Do MMMM YYYY")}</h3>
                        <p styleName="newsDesc">{this.StripHtml(news.Description).substring(0, 300)}...</p>
                    </div>
                </NavLink>
            </Transition>
        ));
    }

    StripHtml = (html) => {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.innerText;
    }

    render() {
        return <div styleName="news">
                    <Transition
                        animation="fade right"
                        duration={1000}
                        transitionOnMount={true}>
                        <div styleName="newsHeader">
                            <h1>Les Actualités</h1>
                            <h2 styleName="newsCategory">{this.props.category.Title}</h2>
                            <p styleName="newsDesc">{this.props.category.Description}</p>
                        </div>
                    </Transition>
                    <div styleName="newsContainer">
                        {this.DisplayNewsCard()}
                    </div>
                </div>
    }

}

export default CSSModules(NewsPortrait, styles, { handleNotFoundStyleName: "log", allowMultiple: true })
