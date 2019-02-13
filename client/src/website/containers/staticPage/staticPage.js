//Initial Declaratinon and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import ScrollTo from '../../components/scrollTo/scrollTo.js';

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

/**
 * Component used to display detailed information about a 
 * selected page.
 */
class StaticPage extends Component {

    constructor(props) {
        super(props);
        this.state = { history: this.props.match.params.link };
    }
    componentDidMount() {
        this.GetPage();
    }

    componentDidUpdate() {
        this.CompareHistory();
    }
    
    /**
     * Method that compare the requested page with the currently 
     * displayed one. Request the new page if theres a difference.
     */
    CompareHistory = () => {
        if (this.props.match.params.link !== this.state.history)
            this.GetPage();
    }
    
    /**
     * Method that get the page from the database.
     */
    GetPage = async() => {
        let request = await Ajax.GetData(`/api/pages/pageurl/${this.props.match.params.link}`);
        if (request.success)
            this.setState({ page: request.data, history: this.props.match.params.link });
    }
    
    /**
     * Method that display the gallery of images
     * if the request page has more than one image
     */
    DisplayImageGallery = (images) => {
        if (images.length > 1)
            return <div styleName="pageGallery">
                        <ImgGalleryColumn images={images} />
                    </div>
    }
    
    /**
     * Method that display all the files from associated with
     * the page.
     */
    DisplayFiles = () => {
        if (this.state.page.PageFiles.length > 0)
            return <FileGallery files={this.state.page.PageFiles} />
    }

    /**
     * Method that display the social bar if the user want it to.
     * We display an empty span if the option is set to false in order
     * to rpeserve the layout.
     */
    DisplaySocials = () => {
        if (this.state.page.DisplaySocials)
            return <SocialIconColumn />
        else
            return <span><br/></span>
    }
    
    /**
     * Method that display the banner of the page based
     * on the template chosen by the user.
     */
    DisplayBanner = () => {
        
        if(this.state.page.PageGallery[0] !== undefined && this.state.page.PageGallery[0] !== null){
            if (this.state.page.Template === 0)
                return <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>
            else if (this.state.page.Template === 1)
                return <div styleName="noBanner"></div>
            else
                return <div styleName="fullBanner" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>
        }
        else
            return <div styleName="noBanner"></div>
    }

    render() {
        if (this.state.page !== undefined) {
            return <div styleName="staticPage">
                            {this.DisplayBanner()}
                            <ScrollTo 
                                position="right"
                                direction="up"
                                anchor={document.querySelector("body")}
                                />
                            <div style={(this.state.page.Template === 2)?{width :"80%"}:{width: "90%"}}>
                                <div styleName="pageLeftColumn">
                                    {this.DisplaySocials()}
                                    {this.DisplayImageGallery(this.state.page.PageGallery)}
                                </div>
                                <div styleName="pageContainer" className={(this.state.page.Template === 0)?"push-top" : "push-bot"}>
                                    <PageHeader
                                        title={this.state.page.PageTitle}
                                        />
                                    <PageContent content={this.state.page.PageContent} />
                                    {this.DisplayFiles()}
                                </div>
                            </div>
                        <PageFooter template={this.state.page.Template} />
                    </div>
        }
    }
}

export default CSSModules(StaticPage, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
