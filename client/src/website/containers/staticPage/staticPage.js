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
        if(this.state.page.PageGallery !== undefined)
        return this.state.page.PageGallery.map((item, index) =>(
        <img alt="newsGallery" key={index} src={item} className="img-full" styleName="pageImgGallery"/>
        ));
    }
    
    CreateMarkup()
    {
        return {__html: this.state.page.PageContent}
    }
    
    render()
    {
    if(this.state.page !== undefined){
    return(
    <div styleName="staticPage">
        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.page.PageGallery[0]}')`}}>
        </div>
        <div styleName="pageContent">
            <h2 styleName="pageCategory">{Utility.TranslatePageCategory(this.state.page.PageCategory)}/</h2>
            <h1 styleName="pageTitle">{this.state.page.PageTitle}</h1>
            <div styleName="pageDescription" dangerouslySetInnerHTML={this.CreateMarkup()}></div>
            <div styleName="pageGallery">
                {this.DisplayNewsGallery()}
            </div>
        </div>
        <div styleName="pageFooter" className="text-primary">
            <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
            <span>Conception par <a href="">Samuel Dubé</a></span>
        </div>
    </div>
    )}
    }
}

export default CSSModules(StaticPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});