//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';
import Ajax from '../../../shared/ajax.js';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsPage.module.css";

//Components Imports
import ImgGalleryColumn from '../../components/imgGalleryColumn/imgGalleryColumn.js';
import PageHeader from '../../components/pageHeader/pageHeader.js';
import PageFooter from '../../components/pageFooter/pageFooter.js';
import PageContent from '../../components/pageContent/pageContent.js';
import FileGallery from '../../components/fileGallery/fileGallery.js';
import NewsColumn from '../../components/newsColumn/newsColumn.js';

class NewsPage extends Component{

    constructor(props)
    {
        super(props);
        this.state = {};
        this.previousLocation = "";
        this.news = {};
    }

    ReadRequest = async(url, keyName, cb) =>
    {
        let request  = await Ajax.GetData(url);
        let tempState = {};
        tempState[keyName.valueOf()] = request.data;
        cb(tempState, keyName);
    }

    componentDidMount() {
        this.ReadRequest(`/api/news/${this.props.match.params.id}`, "news", this.CompareTempStateWithState);
        this.ReadRequest("/api/news/limit/3", "latestNews", this.UpdateState);
    }

    UpdateState = (tempState, keyName) =>
    {
        this.setState(tempState);
    }

    CompareTempStateWithState = (tempState, keyName) =>
    {
        this.news=tempState[keyName.valueOf()];
        if(this.news.Title !== this.state.Title)
            this.setState(this.news);
    }

    componentDidUpdate() {
        if(this.previousLocation !== this.props.location.pathname){
            this.previousLocation = this.props.location.pathname;
            this.ReadRequest(`/api/news/${this.props.match.params.id}`, "news", this.CompareTempStateWithState);
        }
    }

    render()
    {
    if(this.state.Title !== undefined){
    return(
    <div styleName="news">
        <div styleName="newsBanner" style={{backgroundImage : `url('${this.state.Images[0]}')`}}></div>
        <div styleName="newsBody">
            <div styleName="newsContent">
                <PageHeader
                    category={Utility.TranslateNewsCategory(this.state.Category)}
                    title={this.state.Title}
                    date={this.state.DatePublished}
                    />
                <PageContent content={this.state.DescriptionHtml} />
            </div>
            <div styleName="newsFile">
                <FileGallery files={null} />
            </div>
            <div styleName="newsImgGallery">
                <ImgGalleryColumn images={this.state.Images}/>
            </div>
            <div styleName="latestNews">
                <NewsColumn news={this.state.latestNews}/>
            </div>
        </div>
        <PageFooter />
    </div>
    )}
    }
}

export default CSSModules(NewsPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});