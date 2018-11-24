//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';
import Ajax from '../../../shared/ajax.js';
import moment from 'moment';
//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsCategory.module.css";
//Components import
import NewsCard from '../../components/newsCard/newsCard.js';
import 'moment/locale/fr';  // without this line it didn't work
moment.locale('fr');

class NewsCategory extends Component{

    constructor(props)
    {
        super(props);
        this.state = {};
        this.news = {};
        this.newsContainer = React.createRef();
    }

    async componentDidMount()
    {
        Utility.AdjustFullHeight(this.newsContainer.current);
        this.news = await Ajax.GetData(`/api/news/category/${this.props.match.params.category}`);
        this.setState({news : this.news});
    }

    async componentDidUpdate()
    {
        let categoryHistory = this.props.match.params.category;
        if(this.news.data !== undefined && this.news.data.length !== 0){
            if(this.news.data[0].Category !== categoryHistory){
                console.log(true);
                this.news = await Ajax.GetData(`/api/news/category/${this.props.match.params.category}`);
                this.setState({news : this.news});
            }
        }
    }

    GenerateNewsGrid = () =>
    {
        if(this.state.news !== undefined)
        {
        return this.state.news.data.map((item, index)=>(
        this.AppendCardToGrid(item, index)
        ))
        }
    }

    AppendCardToGrid = (item, index) =>
    {
        if(index % 2 === 0)
        return(
        <div styleName="newsWrapper">
            <div styleName="newsContainer" key={index}>
                <div styleName="newsGrid upperGrid">
                    <NewsCard news={item} index={index} />
                </div>
                <div styleName="newsDate">
                    <div styleName="arrowDown"></div>
                    <h2><i className="icon clock outline"></i> Le {moment(item.DatePublished).format("dddd, Do MMMM")}</h2>
                </div>
                <div styleName="newsGrid lowerGrid">
                </div>
            </div>
        </div>
        )
        else
        return(
        <div styleName="newsWrapper">
            <div styleName="newsContainer" key={index}>
                <div styleName="newsGrid upperGrid">
                </div>
                <div styleName="newsDate">
                    <h2><i className="icon clock outline"></i> Le {moment(item.DatePublished).format("dddd, Do MMMM")}</h2>
                    <div styleName="arrowUp"></div>
                </div>
                <div styleName="newsGrid lowerGrid">
                    <NewsCard news={item} index={index} />
                </div>
            </div>
        </div>
        )
    }

    render()
    {
    return(
    <div ref={this.newsContainer} styleName="news">
        {this.GenerateNewsGrid()}
    </div>
    )}
}

export default CSSModules(NewsCategory, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});