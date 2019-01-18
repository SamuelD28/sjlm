//Initial Declaratinon and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import ScrollTop from '../../components/scrollTop/scrollTop.js';

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

class StaticPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.GetPage();
    }

    GetPage = async() => {
        let request = await Ajax.GetData(`/api/pages/pageurl/${this.props.match.params.link}`);

        if (request.data !== undefined)
            this.setState({ page: request.data, pageurl: this.props.match.params.link });
    }

    ComparePageWithState = () => {
        if (this.props.match.params.link !== this.state.pageurl)
            this.GetPage();
    }

    componentDidUpdate() {
        this.ComparePageWithState();
    }

    DisplayImageGallery = (images) => {
        if (images.length > 1)
            return (
                <div styleName="pageGallery">
            <ImgGalleryColumn images={images} />
        </div>
            )
    }

    DisplayFiles = () => {
        if (this.state.page.PageFiles.length > 0)
            return <FileGallery files={this.state.page.PageFiles} />
    }

    DisplaySocials = () => {
        if (this.state.page.DisplaySocials)
            return <SocialIconColumn />
        else
            return <span><br/></span>
    }

    render() {
        if (this.state.page !== undefined) {
            return <div styleName="staticPage">
                        <ScrollTop />
                        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>
                        <div styleName="pageLeftColumn">
                            {this.DisplaySocials()}
                            {this.DisplayImageGallery(this.state.page.PageGallery)}
                        </div>
                        <div styleName="pageContainer">
                            <PageHeader
                                title={this.state.page.PageTitle}
                                />
                            <PageContent content={this.state.page.PageContent} />
                            {this.DisplayFiles()}
                        </div>
                        <PageFooter />
                    </div>
        }
    }
}

export default CSSModules(StaticPage, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
