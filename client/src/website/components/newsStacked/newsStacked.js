import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NewsDescription from '../newsDescription/newsDescription.js';
import NewsNavigation from '../newsNavigation/newsNavigation.js';
import ScrollTop from '../scrollTop/scrollTop.js';
import { Transition, Divider } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './newsStacked.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
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
        let sortedNews = news.sort((a , b) => new Date(b.DateFrom) -new Date(a.DateFrom));
        return sortedNews.map((news) => (
            <NavLink 
                to={`/news/${news._id}`} 
                styleName="newsCard" 
                className="component-card rounded medium-spacing-bot anim-bounce-up" 
                key={news._id}>
                <div styleName="newsDate" className="rounded-left">
                    <h4 style={{color: "white"}}>{moment(news.DateFrom).format("Do MMMM")} </h4>
                </div>
                <div styleName="newsCardInfo" className="medium-gutters">
                    <h3>{news.Title}</h3>
                    <div>
                    {news.Files.map((file, index)=>(
                        <a key={index} href={file}><i className="icon file alternate outline"></i>{file.substring(file.lastIndexOf("/") + 1 ,file.length)}</a>
                    ))}
                    </div>
                </div>
            </NavLink>))
    }

    render() {
        if (this.state.years !== undefined)
            return <div styleName="newsBody">
                    <ScrollTop 
                        anchor={document.getElementById("description")}
                        direction="left"
                        position="left"
                        />
                    <div styleName="newsWrapper newsDescription"  id="description"> 
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
