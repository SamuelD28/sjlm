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
        this.state = {currentCategory : ""};
        this.newsContainer = React.createRef();
    }

    componentDidMount()
    {
        Utility.AdjustFullHeight(this.newsContainer.current);
    }

    async componentDidUpdate()
    {
        if(this.state.currentCategory.UrlValue !== this.props.match.params.category){
            let news = await Ajax.GetData(`/api/news/category/${this.props.match.params.category}`);
            let category = await Ajax.GetData(`/api/categorynews/url/${this.props.match.params.category}`)
            this.setState({news : news.data, currentCategory: category.data});
        }
    }

    GenerateNewsGrid = () =>
    {
        if(this.state.news !== undefined && this.state.currentCategory !== ""){

            let template = this.state.currentCategory.Template;
            console.log(this.state);
            if(template === "timeline")
                return this.state.news.map((item, index)=>(
                    this.AppendCardToGrid(item, index)
                ))
            else if(template === "stacked")
                return <h1>Stacked Layout</h1>
            else
                return <h1>Default layout</h1>
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
                    <h2><i className="icon clock outline"></i> Le {moment(item.createdAt).format("dddd, Do MMMM")}</h2>
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
                    <h2><i className="icon clock outline"></i> Le {moment(item.createdAt).format("dddd, Do MMMM")}</h2>
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