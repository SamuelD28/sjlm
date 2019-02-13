import React, { Component } from 'react';
import NewsCardTimeline from '../../components/newsCardTimeline/newsCardTimeline.js';
import { Utility } from '../../../shared/utility.js';
import Ajax from '../../../shared/ajax.js';

import { Transition } from 'semantic-ui-react';
import CSSModules from 'react-css-modules';
import styles from './newsTimeline.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

/**
 * Component used to display all the news in a chronological order
 */
class NewsTimeline extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCategory: "" };
        this.newsContainer = React.createRef();
    }

    componentDidMount() {
        //Set the height to the full height of the container
        Utility.AdjustFullHeight(this.newsContainer.current);
        this.GetCalendar();
    }
    
    /**
     * Retrieve all the news that are going to be displayed 
     * inside the calendar
     */
    GetCalendar = async() => {
        let news = await Ajax.GetData("/api/news/calendar");
        if (news.success) {
            this.setState({ calendar: news.data });
        }
    }

    /**
     * Method that display the calendar inside the form
     */
    DisplayCalendar = () => {
        if (this.state.calendar !== undefined) 
            return this.state.calendar.map((news, index) => (
                this.AppendCardToGrid(news, index)
            ))
    }

    DisplayNews = () => {
        return this.props.news.map((news, index) => (
            this.AppendCardToGrid(news, index)
        ))
    }
    
    /**
     * Method that display the date centered in the page
     */
    DisplayDate = (news) => {
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
                        </div>
                    </div>
                </Transition>
    }
    
    /**
     * Method used to append the news card at either the
     * top or the bottom of the grid. Based on the index
     * of the news inside the array
     */
    AppendCardToGrid = (news, index) => {
        if (index % 2 === 0)
            return <div key={news._id} styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="upperGrid">
                                <NewsCardTimeline news={news} index={index} />
                            </div>
                            {this.DisplayDate(news)}
                            <div styleName="lowerGrid">
                            </div>
                        </div>
                    </div>
        else
            return <div key={news._id} styleName="newsWrapper">
                        <div styleName="newsContainer" key={index}>
                            <div styleName="upperGrid">
                            </div>
                            {this.DisplayDate(news)}
                            <div styleName="lowerGrid">
                                <NewsCardTimeline news={news} index={index} />
                            </div>
                        </div>
                    </div>
    }

    render() {
        return <div ref={this.newsContainer} styleName="news">
                    {(this.props.calendrier)
                    ?this.DisplayCalendar()
                    :this.DisplayNews()}
                </div>
    }

}

export default CSSModules(NewsTimeline, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
