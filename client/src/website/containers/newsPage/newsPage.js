//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax} from '../../../shared/utility.js';
import moment from 'moment';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsPage.module.css";

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
    
    CreateMarkup()
    {
        return {__html: this.state.news.DescriptionHtml}
    }
    
    DisplayNewsGallery = () =>{
        if(this.state.news.Images !== undefined)
        return this.state.news.Images.map((item, index) =>(
        <img alt="newsGallery" key={index} src={item} className="img-full" styleName="newsImgGallery"/>
        ));
    }
    
    GoBackHome = () =>{
        this.props.history.push("/");
    }
    
    render()
    {
    if(this.state.news !== undefined){
    return(
    <div styleName="staticPage">
        <div styleName="bannerPhoto" style={{backgroundImage : `url('${this.state.news.Images[0]}')`}}>
        </div>
        <div styleName="newsContent">
            <button className="btn btn-outline-info" onClick={this.GoBackHome}><i className="icon chevron left"></i> Retour</button>
            <h2 styleName="newsCategory">{this.state.news.Category}</h2>
            <h1 styleName="newsTitle">{this.state.news.Title}</h1>
            <h3 styleName="newsDate">
                <i className="icon clock"></i> Actualitée publié le : {moment(this.state.news.DatePublished).format("YYYY-MM-DD")}
            </h3>
            <div styleName="newsDescription" dangerouslySetInnerHTML={this.CreateMarkup()}></div>
            <div styleName="newsGallery">
                {this.DisplayNewsGallery()}
            </div>
        </div>
        <div styleName="newsFooter" className="text-primary">
            <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
            <span>Conception par <a href="">Samuel Dubé</a></span>
        </div>
    </div>
    )}
    }
}

export default CSSModules(NewsPage, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});