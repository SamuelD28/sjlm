import React, { Component } from 'react';

import NewsDescription from '../../components/newsDescription/newsDescription.js';
import NewsNavigation from '../../components/newsNavigation/newsNavigation.js';
import NewsCardStacked from '../../components/newsCardStacked/newsCardStacked.js';
import ScrollTo from '../../components/scrollTo/scrollTo.js';
import { Transition, Divider } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './newsStacked.module.css';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

/**
 * Component used to display the stacked layout for the news section
 */
class NewsStacked extends Component {

    state = {};

    async componentDidMount() {
        let yearSet = {};
        this.props.news.map((news, index) => {

            //We check if the key exists, otherwise we assign an array to that key
            if (yearSet[(moment(news.DateFrom).year())] === undefined)
                yearSet[(moment(news.DateFrom).year())] = [];

            //we pushed the news to the belonged year
            return yearSet[(moment(news.DateFrom).year())].push(news);
        })

        //Used for the animation of news container
        let itemsVisible = [];
        Object.keys(yearSet).map(() => {
            return itemsVisible.push(false);
        });
        await this.setState({ years: yearSet, itemsVisible: itemsVisible });
        this.StartNextAnimation(0);
    }

    /**
     * Method that waits for an animation to end before
     * starting a new one.
     */
    StartNextAnimation = (index) => {
        if (index < this.state.itemsVisible.length) {
            setTimeout(() => {
                let temp = Array.from(this.state.itemsVisible);
                temp[index] = true;
                this.setState({ itemsVisible: temp })
            }, this.state.animationDelay);
        }
    }

    /**
     * Method that create a container for the news of each year
     */
    DisplayNewsCard = () => {
        if (this.state.years !== undefined)
            return Object.keys(this.state.years).reverse().map((year, index) => (
                <Transition
                    key={year}
                    onComplete={() => this.StartNextAnimation(index + 1)}
                    duration={500}
                    visible={this.state.itemsVisible[index]}
                    animation="fade right"
                    className="transitionWrapper"
                >
                    <div
                        styleName="newsWrapper"
                        className="component-card medium-gutters rounded"
                        id={year}>
                        <h1>Année {year}</h1>
                        <Divider />
                        {this.MapNews(this.state.years[year])}
                    </div>
                </Transition>
            ))
    }

    /**
     * Method that the information of a news to a layout
     */
    MapNews = (news) => {
        let sortedNews = news.sort((a, b) => new Date(b.DateFrom) - new Date(a.DateFrom));
        return sortedNews.map((news) => (
            <NewsCardStacked key={news._id} news={news} />
        ))
    }

    render() {
        if (this.state.years !== undefined)
            return <div styleName="newsBody">
                <div styleName="scrollWeb">
                    <ScrollTo
                        anchor={document.getElementById("description")}
                        direction="left"
                        position="left"
                    />
                </div>
                <div styleName="scrollMobile">
                    <ScrollTo
                        anchor={document.getElementById("description")}
                        direction="up"
                        position="bottom"
                    />
                </div>
                <div styleName="newsWrapper newsDescription" id="description">
                    <NewsDescription
                        Description={this.props.category.Description}
                        Title={this.props.category.Title}
                    />
                    <NewsNavigation
                        targets={this.state.years}
                        itemsVisible={this.state.itemsVisible}
                    />
                </div>
                {this.DisplayNewsCard()}
            </div>
    }
}

export default CSSModules(NewsStacked, styles, { handleNotFoundStyleName: "log", allowMultiple: true })
