//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./staticPage.module.css";

class StaticPage extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.page = {};
        this.footer = React.createRef();
    }
    
    async componentDidMount()
    {
        this.page = await Ajax.GetData(`/api/pages/${this.props.match.params.id}`);
        this.setState({page : this.page});
    }
    
    //OPTIMISATION NECESSAIRE. APPELLER UNE REQUETE AJAX A CHAQUE QUE LE COMPONENT UPDATE EST TRES COUTEUX
    async componentDidUpdate()
    {
        console.log("Updating component page");
        
        this.page = await Ajax.GetData(`/api/pages/${this.props.match.params.id}`);
        if(this.state.page.PageTitle !== undefined && this.state.PageTitle !== null)
        {
            if(this.state.page.PageTitle !== this.page.PageTitle)
                this.setState({page : this.page});
        }
    }
    
    DisplayNewsGallery = () =>{
        if(this.state.page.PageGallery.length > 0)
        return(
        <div styleName="pageGallery">
            {this.DisplayAllImages(this.state.page.PageGallery)}
        </div>
        );
    }
    
    DisplayAllImages = (gallery) =>{
        return gallery.map((item, index) =>(
        <a href={item} target="_blank" rel="noopener noreferrer" key={index}>    
            <img alt="gallerie" key={index} src={item} className="img-full" styleName="pageImgGallery"/>
        </a>
        ))
    }
    
    CreateMarkup()
    {
        return {__html: this.state.page.PageContent}
    }
    
    DisplayPageBanner = () =>{
        
        if(this.state.page.PageGallery.length > 0)
            return (<div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}></div>)
        else 
            return (<div styleName="bannerPhoto" style={{backgroundImage : `url('https://res.cloudinary.com/dohwohspb/image/upload/v1539711446/sjlm/6872080-canada-landscape.jpg')`}}></div>)
        
    }
    
    GoBackHome = () =>{
        this.props.history.push("/");
    }
    
    GoDown = () => 
    {
        let website = this.footer.current;
        website.scrollIntoView({block : "start", behavior : "smooth"});
    }
    
    render()
    {
    if(this.state.page !== undefined){
    return(
    <div styleName="staticPage">
        {this.DisplayPageBanner()}
        <div styleName="pageContent">
            <div styleName="actionBtn">
                <button className="btn btn-outline-info" onClick={this.GoBackHome}><i className="icon chevron left"></i> Retour</button>
                <button className="btn btn-outline-info" onClick={this.GoDown}>Bas <i className="icon chevron down"></i></button>
            </div>
            <div styleName="pageHeader">
                <h2 styleName="pageCategory">{Utility.TranslatePageCategory(this.state.page.PageCategory)}</h2>
                <h1 styleName="pageTitle">{this.state.page.PageTitle}</h1>
            </div>
            <div styleName="pageDescription" dangerouslySetInnerHTML={this.CreateMarkup()}></div>
            <div styleName="pageFile">
                <h2>Fichiers joints</h2>
                <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline-info btn-file"><i className="icon file"></i> Sjlm.pdf</button>
                </a>
                <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline-info btn-file"><i className="icon file"></i> Programmation.pdf</button>
                </a>
                <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline-info btn-file"><i className="icon file"></i> Horaire.pdf</button>
                </a>
            </div>
            {this.DisplayNewsGallery()}
        </div>
        <div styleName="pageFooter" className="text-primary" ref={this.footer}>
            <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
            <span>Conception par <a href="">Samuel Dubé</a></span>
        </div>
    </div>
    )}
    }
}

export default CSSModules(StaticPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});