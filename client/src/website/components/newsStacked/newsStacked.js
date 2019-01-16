import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Transition } from 'semantic-ui-react';
import CSSModules from 'react-css-modules';
import styles from './newsStacked.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsStacked extends Component {


    constructor(props) {
        super(props);
        this.state = { backgroundImage: this.ChooseRandomBackground() };
    }

    componentDidMount() {
        let yearSet = {};
        this.props.news.map((news, index) => {

            if (yearSet[(moment(news.DateFrom).year())] === undefined)
                yearSet[(moment(news.DateFrom).year())] = [];

            return yearSet[(moment(news.DateFrom).year())].push(news);
        })

        this.setState({ years: yearSet });
    }

    DisplayNewsCard = () => {
        if (this.state.years !== undefined)
            return Object.keys(this.state.years).reverse().map((year, index) => (
                <div styleName="newsYear" key={year} id={year}>
                <h1>Année {year}</h1>
                {this.MapNews(this.state.years[year])}
            </div>
            ))
    }

    ChooseRandomBackground = () => {

        let backgroundImage = [
            "https://res.cloudinary.com/dohwohspb/image/upload/v1547598512/images/website/St_Jacques_le_Mineur_avril_2011_094.jpg",
            "https://res.cloudinary.com/dohwohspb/image/upload/v1547598518/images/website/St_Jacques_le_Mineur_avril_2011_032.jpg",
            "https://res.cloudinary.com/dohwohspb/image/upload/v1547598536/images/website/fevrier2008_476.jpg",
            "https://res.cloudinary.com/dohwohspb/image/upload/v1547598536/images/website/fevrier2008_547.jpg"
            ]

        return backgroundImage[Math.floor((Math.random() * backgroundImage.length))];
    }

    MapNews = (news) => {
        return news.map((news, index) => (
            <div styleName="newsCard" key={news._id}>
                <NavLink styleName="newsLink" to={`/news/${news._id}`}><i className="icon external"></i></NavLink>
                <div>
                    <h4>{moment(news.DateFrom).format("dddd, Do MMMM")} </h4>
                    <h3>{news.Title}</h3>
                    <div>
                    {news.Files.map((file, index)=>(
                        <a key={index} href={file}><i className="icon file alternate outline"></i>{file.substring(file.lastIndexOf("/") + 1 ,file.length)}</a>
                    ))}
                    </div>
                </div>
            </div>));
    }

    GenerateNavigation = () => {
        return <Transition
                        animation="fade left"
                        duration={1000}
                        transitionOnMount={true}>
                        <div styleName="navigation">
                            <h1 styleName="categoryTitle">Naviguez</h1>
                            <div styleName="yearLinks">
                            { Object.keys(this.state.years).reverse().map((year) => (
                                <a key={year} styleName="yearlink" href={`#${year}`}><i className="icon chevron down"></i>{year}</a>
                            ))}
                            </div>
                        </div>
                    </Transition>
    }

    DisplayDescription = () => {
        return <Transition
                    animation="fade right"
                    duration={1000}
                    transitionOnMount={true}>
                    <div styleName="description">
                        <h1 styleName="categoryTitle">{this.props.category.Title}</h1>
                        <p styleName="categoryDesc">{this.props.category.Description}</p>
                    </div>
                </Transition>
    }

    render() {
        if (this.state.years !== undefined)
            return <div styleName="newsBody">
                    <div className="img-bg" styleName="newsBackground" style={{backgroundImage: `url('${this.state.backgroundImage}')`}}></div>
                    <div styleName="newsContainer">
                        {this.DisplayDescription()}
                        <Transition
                            animation="fade up"
                            duration={1000}
                            transitionOnMount={true}>
                            <div styleName="newsYearsContainer">
                                {this.DisplayNewsCard()}
                            </div>
                        </Transition>
                        {this.GenerateNavigation()}
                    </div>
                </div>
    }
}

export default CSSModules(NewsStacked, styles, { handleNotFoundStyleName: "log", allowMultiple: true })
