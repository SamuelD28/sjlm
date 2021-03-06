//Initial Declaratinon and importation
import React, { Component } from 'react';
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
import ScrollTo from "../../components/scrollTo/scrollTo.js";

/**
 * Component that display a page for a selected news
 */
class NewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { previousLocation: "" };
    }

    componentDidMount() {
        this.GetNews();
    }

    /**
     * Method that gets all the news from the database.
     */
    GetNews = async() => {
        if (this.state.previousLocation !== this.props.location.pathname) {
            let request = await Ajax.GetData(`/api/news/${this.props.match.params.id}`);

            if (request.data !== undefined)
                await this.setState({ news: request.data, previousLocation: this.props.location.pathname });
        }
    }

    componentDidUpdate() {
        this.GetNews();
    }
    
    /**
     * Method that diplay all the files if there are files associated with the selected news.
     */
    DisplayFiles = () => {
        if (this.state.news.Files.length > 0)
            return <div styleName="newsFile">
                        <FileGallery files={this.state.news.Files} />
                     </div>
    }
    
    /**
     * Method that diplay the gallery of images if the selected news
     * has more than one image associated with it.
     */
    DisplayGallery = () => {

        if (this.state.news.Images.length > 1)
            return <div styleName="newsImgGallery">
                    <ImgGalleryColumn images={this.state.news.Images}/>
                </div>
    }
    
    /**
     * Method that display the banner background if the selected news
     * has one image associated with it.
     */ 
    DisplayBackground = () =>{
        if(this.state.news.Images[0] !== undefined)
            return <div styleName="newsBanner" style={{backgroundImage : `url('${this.state.news.Images[0]}')`}}></div>
        else 
            return <div  styleName="newsBanner"></div>
    }
    
    render() {
        if (this.state.news !== undefined) {
            return <div styleName="news">
                        <ScrollTo />
                        {this.DisplayBackground()}
                        <div styleName="newsBody">
                            <div styleName="newsContent">
                                <PageHeader
                                    category={(this.state.news.Category.Title)}
                                    title={this.state.news.Title}
                                    date={this.state.news.DateFrom}
                                    />
                                <PageContent content={this.state.news.Description} />
                            </div>
                            {this.DisplayFiles()}
                            {this.DisplayGallery()}
                            <div styleName="latestNews">
                                <NewsColumn news={this.state.news.latestNews}/>
                            </div>
                        </div>
                        <PageFooter />
                    </div>
        }
    }
}

export default CSSModules(NewsPage, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
