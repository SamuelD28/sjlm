//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';
import moment from 'moment';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsPage.module.css";

//Components Imports
import ImgGalleryColumn from '../../components/imgGalleryColumn/imgGalleryColumn.js';
import PageHeader from '../../components/pageHeader/pageHeader.js';
import PageFooter from '../../components/pageFooter/pageFooter.js';
import PageContent from '../../components/pageContent/pageContent.js';
import FileGallery from '../../components/fileGallery/fileGallery.js';

class NewsPage extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.news = {};
    }
    
    async componentDidMount()
    {
        this.news = await Ajax.GetData('/api/news/' + this.props.match.params.id);
        this.setState({news : this.news});
    }
    
    render()
    {
    if(this.state.news !== undefined){
    return(
    <div styleName="staticPage">
        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.news.Images[0]}')`}}>
        </div>
        <div styleName="newsContent">
            <PageHeader 
                category={Utility.TranslateNewsCategory(this.state.news.Category)}
                title={this.state.news.Title}
                date={this.state.news.DatePublished}
                />
            <PageContent content={this.state.news.DescriptionHtml} />
            <FileGallery files={null} />
            <ImgGalleryColumn images={this.state.news.Images} />
        </div>
        <PageFooter />
    </div>
    )}
    }
}

export default CSSModules(NewsPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});