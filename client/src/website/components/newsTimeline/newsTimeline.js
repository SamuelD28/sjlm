import React, {Component} from 'react';
import NewsCard from '../newsCard/newsCard.js';
import {Utility} from '../../../shared/utility.js';

import CSSModules from 'react-css-modules';
import styles from './newsTimeline.module.css';

import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
moment.locale('fr');

class NewsTimeline extends Component{

    constructor(props)
    {
        super(props);
        this.state = {currentCategory : ""};
        this.newsContainer = React.createRef();
    }

    componentDidMount()
    {
        Utility.AdjustFullHeight(this.newsContainer.current);
    }

    DisplayNews = () =>
    {
        return this.props.news.map((news, index) =>(
            this.AppendCardToGrid(news, index)
        ))
    }

    AppendCardToGrid = (news, index) =>
    {
        if(index % 2 === 0)
            return  <div styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="newsGrid upperGrid">
                                <NewsCard news={news} index={index} />
                            </div>
                            <div styleName="newsDate">
                                <div styleName="arrowDown"></div>
                                <h2><i className="icon clock outline"></i> Le {moment(news.createdAt).format("dddd, Do MMMM")}</h2>
                            </div>
                            <div styleName="newsGrid lowerGrid">
                            </div>
                        </div>
                    </div>
        else
            return  <div styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="newsGrid upperGrid">
                            </div>
                            <div styleName="newsDate">
                                <h2><i className="icon clock outline"></i> Le {moment(news.createdAt).format("dddd, Do MMMM")}</h2>
                                <div styleName="arrowUp"></div>
                            </div>
                            <div styleName="newsGrid lowerGrid">
                                <NewsCard news={news} index={index} />
                            </div>
                        </div>
                    </div>
    }

    render()
    {
        return  <div ref={this.newsContainer} styleName="news">
                    {this.DisplayNews()}
                </div>
    }

}

export default CSSModules(NewsTimeline, styles, {handleNotFoundStyleName: "log", allowMultiple: true});