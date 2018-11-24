//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';
import Ajax from '../../../shared/ajax.js';

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

    ReadRequest = async(url, name) =>
    {
        let request  = await Ajax.GetData(url);
        let stateObject = {};
        stateObject[name.valueOf()] = request.data
        this.page=stateObject[name.valueOf()];
        this.ComparePageWithState();
    }

    componentDidMount() {
        this.ReadRequest(`/api/pages/${this.props.match.params.id}`, "page");
    }

    ComparePageWithState = () =>
    {
        if(this.page.PageTitle !== this.state.PageTitle)
            this.setState(this.page);
    }

    componentDidUpdate() {
        this.ReadRequest(`/api/pages/${this.props.match.params.id}`, "page");
        this.ComparePageWithState();
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
    if(this.state.PageTitle !== undefined){
    return(
    <div styleName="staticPage">
        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.PageGallery[0]}')`}}></div>
        <div styleName="pageLeftColumn">
            <SocialIconColumn />
            {this.DisplayImageGallery(this.state.PageGallery)}
        </div>
        <div styleName="pageContainer">
            <PageHeader
                title={this.state.PageTitle}
                category={Utility.TranslatePageCategory(this.state.PageCategory)}
                />
            <PageContent content={this.state.PageContent} />
            <FileGallery files={null} />
        </div>
        <PageFooter />
    </div>
    )}}
}

export default CSSModules(StaticPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});