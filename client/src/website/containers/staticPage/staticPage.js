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
        console.log("Updating component page");
        
        this.page = await Ajax.GetData(`/api/pages/${this.props.match.params.id}`);
        if(this.state.page.PageTitle !== undefined && this.state.PageTitle !== null)
        {
            if(this.state.page.PageTitle !== this.page.PageTitle)
                this.setState({page : this.page});
        }
    }
    
    //On pourrait mettre la photo par default dans la db au lieu de la mettre ici
    DisplayPageBanner = () =>{
        
        if(this.state.page.PageGallery.length > 0)
            return (<div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>)
        else 
            return (<div styleName="bannerPhoto" style={{backgroundImage : `url('https://res.cloudinary.com/dohwohspb/image/upload/v1539711446/sjlm/6872080-canada-landscape.jpg')`}}></div>)
        
    }
    
    render()
    {
    if(this.state.page !== undefined){
    return(
    <div styleName="staticPage">
        {this.DisplayPageBanner()}
        <div styleName="pageLeftColumn"> 
            <SocialIconColumn />
            <div styleName="pageGallery">
                <ImgGalleryColumn images={this.state.page.PageGallery} />
            </div>
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