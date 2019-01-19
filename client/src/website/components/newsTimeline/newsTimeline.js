import React, { Component } from 'react';
import NewsCard from '../newsCard/newsCard.js';
import { Utility } from '../../../shared/utility.js';

import { Transition } from 'semantic-ui-react';
import CSSModules from 'react-css-modules';
import styles from './newsTimeline.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsTimeline extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCategory: "" };
        this.newsContainer = React.createRef();
    }

    componentDidMount() {
        Utility.AdjustFullHeight(this.newsContainer.current);
    }

    DisplayNews = () => {
        return this.props.news.map((news, index) => (
            this.AppendCardToGrid(news, index)
        ))
    }

    DisplayDate = (news) => {

        // "rocket "
        // <i style = { { margin: "0", color: "#bcbdbd" } } className = "icon rocket large" > < /i>

        return <Transition
                    animation="fade right"
                    duration={1000}
                    transitionOnMount={true}>
                    <div styleName="newsDate">
                        <div styleName="newsDate">
                            <span styleName="dateBorder"></span>
                            <div styleName="dateContainer">
                                {(news.DateTo !== null && news.DateTo !== undefined)
                                ?<span styleName="date">{moment(news.DateFrom).format("Do MMMM")} au {moment(news.DateTo).format("Do MMMM")} </span>
                                :<span styleName="date">Le {moment(news.DateFrom).format("dddd, Do MMMM")} </span>
                                }
                                <span styleName="location">{(news.Location !== undefined)? news.Location: ""}</span>
                            </div>
                            <span styleName="dateBorder"></span>
                            <span styleName="arrowLeft"></span>
                        </div>
                    </div>
                </Transition>
    }

    AppendCardToGrid = (news, index) => {
        if (index % 2 === 0)
            return <div key={news._id} styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="newsGrid upperGrid">
                                <NewsCard news={news} index={index} />
                            </div>
                            {this.DisplayDate(news)}
                            <div styleName="newsGrid lowerGrid">
                            </div>
                        </div>
                    </div>
        else
            return <div key={news._id} styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="newsGrid upperGrid">
                            </div>
                            {this.DisplayDate(news)}
                            <div styleName="newsGrid lowerGrid">
                                <NewsCard news={news} index={index} />
                            </div>
                        </div>
                    </div>
    }

    render() {
        return <div ref={this.newsContainer} styleName="news">
                    {this.DisplayNews()}
                </div>
    }

}

export default CSSModules(NewsTimeline, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
