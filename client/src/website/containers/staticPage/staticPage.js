//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./staticPage.module.css";

//Components
import ImgGalleryColumn from '../../components/imgGalleryColumn/imgGalleryColumn.js';
import SocialIconColumn from '../../components/socialIconColumn/socialIconColumn.js';
import FileGallery from '../../components/fileGallery/fileGallery.js';
import PageHeader from '../../components/pageHeader/pageHeader.js';
import PageFooter from '../../components/pageFooter/pageFooter.js';
import PageContent from '../../components/pageContent/pageContent.js';

class StaticPage extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.page = {};
    }
    
    async componentDidMount() {
        this.page = await Ajax.GetData(`/api/pages/${this.props.match.params.id}`);
        this.setState({page : this.page});
    }
    
    async componentDidUpdate() {
        this.page = await Ajax.GetData(`/api/pages/${this.props.match.params.id}`);
        if(this.state.page.PageTitle !== undefined && this.state.PageTitle !== null)
        {
            if(this.state.page.PageTitle !== this.page.PageTitle)
                this.setState({page : this.page});
        }
    }
    
    DisplayImageGallery = (images) =>
    {
        if(images.length > 1)
        return(
        <div styleName="pageGallery">
            <ImgGalleryColumn images={images} />
        </div>    
        )
    }
    
    render()
    {
    if(this.state.page !== undefined){
    return(
    <div styleName="staticPage">
        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>
        <div styleName="pageLeftColumn"> 
            <SocialIconColumn />
            {this.DisplayImageGallery(this.state.page.PageGallery)}
        </div>
        <div styleName="pageContainer">
            <PageHeader 
                title={this.state.page.PageTitle} 
                category={Utility.TranslatePageCategory(this.state.page.PageCategory)} 
                />
            <PageContent content={this.state.page.PageContent} />
            <FileGallery files={null} />
        </div>
        <PageFooter />
    </div>
    )}}
}

export default CSSModules(StaticPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});