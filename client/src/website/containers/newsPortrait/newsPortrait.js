import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';

import NewsCardPortrait from '../../components/newsCardPortrait/newsCardPortrait.js';

import CSSModules from 'react-css-modules';
import styles from './newsPortrait.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

/**
 * Component sued to display all the news in a portrait layout
 */
class NewsPortrait extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }
    
    /**
     * Method that display the news inside the layout
     */
    DisplayNewsCard = () => {
        return this.props.news.map((news) => (
            <NewsCardPortrait news={news}/>
        ));
    }
    
    /**
     * Method used to strip the html from the news data.
     */
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
