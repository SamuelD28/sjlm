//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';

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
        this.news = {};
    }
    
    async componentDidMount() {
        this.news = await Ajax.GetData('/api/news/' + this.props.match.params.id);
        this.latestNews = await Ajax.GetData('/api/news/limit/3');
        this.setState({news : this.news, latestNews: this.latestNews});
    }
    
    async componentDidUpdate() {
        this.news = await Ajax.GetData(`/api/news/${this.props.match.params.id}`);
        if(this.state.news.Title !== undefined && this.state.Title !== null)
        {
            if(this.state.news.Title !== this.news.Title)
                this.setState({news : this.news});
        }
    }
    
    render()
    {
    if(this.state.news !== undefined){
    return(
    <div styleName="news">
        <div styleName="newsBanner" style={{backgroundImage : `url('${this.state.news.Images[0]}')`}}></div>
        <div styleName="newsBody">
            <div styleName="newsContent">
                <PageHeader 
                    category={Utility.TranslateNewsCategory(this.state.news.Category)}
                    title={this.state.news.Title}
                    date={this.state.news.DatePublished}
                    />
                <PageContent content={this.state.news.DescriptionHtml} />
            </div>
            <div styleName="newsFile">
                <FileGallery files={null} />
            </div>
            <div styleName="newsImgGallery">
                <ImgGalleryColumn images={this.state.news.Images}/>
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